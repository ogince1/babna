-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('client', 'owner', 'admin');
CREATE TYPE property_type AS ENUM ('apartment', 'villa', 'riad', 'studio');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded');

-- Create users table (extends auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    whatsapp TEXT,
    role user_role DEFAULT 'client',
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT,
    lat DECIMAL(10,8),
    lng DECIMAL(11,8),
    images TEXT[],
    amenities TEXT[],
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    max_guests INTEGER NOT NULL,
    property_type property_type NOT NULL,
    owner_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    is_available BOOLEAN DEFAULT true,
    is_approved BOOLEAN DEFAULT false,
    rating DECIMAL(3,2) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE public.bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INTEGER NOT NULL DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status booking_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table
CREATE TABLE public.favorites (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, property_id)
);

-- Create reviews table
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(booking_id)
);

-- Create indexes for better performance
CREATE INDEX idx_properties_city ON public.properties(city);
CREATE INDEX idx_properties_owner_id ON public.properties(owner_id);
CREATE INDEX idx_properties_is_available ON public.properties(is_available);
CREATE INDEX idx_properties_is_approved ON public.properties(is_approved);
CREATE INDEX idx_bookings_property_id ON public.bookings(property_id);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_check_in ON public.bookings(check_in);
CREATE INDEX idx_bookings_check_out ON public.bookings(check_out);
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_reviews_property_id ON public.reviews(property_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (id = auth.uid());

-- Properties policies - Simplified to avoid recursion
CREATE POLICY "Anyone can view approved properties" ON public.properties
    FOR SELECT USING (is_approved = true AND is_available = true);

CREATE POLICY "Property owners can view their own properties" ON public.properties
    FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "Property owners can manage their own properties" ON public.properties
    FOR ALL USING (owner_id = auth.uid());

-- Bookings policies
CREATE POLICY "Users can view their own bookings" ON public.bookings
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Property owners can view bookings for their properties" ON public.bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.properties 
            WHERE id = property_id AND owner_id = auth.uid()
        )
    );

CREATE POLICY "Users can create their own bookings" ON public.bookings
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own bookings" ON public.bookings
    FOR UPDATE USING (user_id = auth.uid());

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON public.favorites
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own favorites" ON public.favorites
    FOR ALL USING (user_id = auth.uid());

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their bookings" ON public.reviews
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM public.bookings 
            WHERE id = booking_id AND user_id = auth.uid()
        )
    );

CREATE POLICY "Users can update their own reviews" ON public.reviews
    FOR UPDATE USING (user_id = auth.uid());

-- Create functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update property rating when reviews change
CREATE OR REPLACE FUNCTION update_property_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.properties 
    SET 
        rating = (
            SELECT COALESCE(AVG(rating), 0) 
            FROM public.reviews 
            WHERE property_id = COALESCE(NEW.property_id, OLD.property_id)
        ),
        reviews_count = (
            SELECT COUNT(*) 
            FROM public.reviews 
            WHERE property_id = COALESCE(NEW.property_id, OLD.property_id)
        )
    WHERE id = COALESCE(NEW.property_id, OLD.property_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

-- Create trigger for rating updates
CREATE TRIGGER update_property_rating_trigger 
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_property_rating();
