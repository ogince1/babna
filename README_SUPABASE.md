# Configuration Supabase - MarocRentals

## Vue d'ensemble

Ce projet utilise Supabase comme backend-as-a-service pour la gestion de la base de données, l'authentification et le stockage de fichiers.

## Prérequis

### 1. Docker Desktop
Supabase local nécessite Docker Desktop. Installez-le depuis :
https://www.docker.com/products/docker-desktop/

### 2. Supabase CLI
Le CLI est déjà installé dans le projet. Vérifiez la version :
```bash
supabase --version
```

## Configuration

### 1. Variables d'environnement
Créez un fichier `.env.local` à la racine du projet avec le contenu suivant :
```env
# Supabase Configuration
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# Application Configuration
VITE_APP_NAME=MarocRentals
VITE_APP_URL=http://localhost:5173
```

### 2. Démarrer Supabase local
```bash
# Démarrer Supabase
supabase start

# Vérifier le statut
supabase status
```

### 3. Appliquer les migrations
```bash
# Appliquer les migrations
supabase db reset

# Ou appliquer seulement les migrations
supabase db push
```

## Structure de la base de données

### Tables principales

#### 1. `users`
- Étend `auth.users` de Supabase
- Stocke les informations de profil utilisateur
- Rôles : client, owner, admin

#### 2. `properties`
- Appartements, villas, riads, studios
- Informations détaillées : prix, localisation, équipements
- Système d'approbation et de disponibilité

#### 3. `bookings`
- Réservations des utilisateurs
- Statuts : pending, confirmed, cancelled, completed
- Gestion des paiements

#### 4. `favorites`
- Favoris des utilisateurs
- Relation many-to-many entre users et properties

#### 5. `reviews`
- Avis et notes sur les propriétés
- Système de notation automatique

### Sécurité (RLS)

Toutes les tables utilisent Row Level Security (RLS) :

- **Users** : Chaque utilisateur ne voit que son profil
- **Properties** : Seules les propriétés approuvées sont visibles publiquement
- **Bookings** : Utilisateurs voient leurs réservations, propriétaires voient les réservations de leurs biens
- **Favorites** : Chaque utilisateur gère ses propres favoris
- **Reviews** : Visibles par tous, créables seulement par les utilisateurs ayant réservé

## Utilisation dans l'application

### 1. Client Supabase
```typescript
import { supabase } from '../lib/supabase';
```

### 2. Hook d'authentification
```typescript
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';

const { user, profile, signIn, signUp, signOut } = useSupabaseAuth();
```

### 3. Helpers pour les opérations courantes
```typescript
import { supabaseHelpers } from '../lib/supabase';

// Récupérer les propriétés
const properties = await supabaseHelpers.getProperties();

// Récupérer les propriétés par ville
const marrakechProperties = await supabaseHelpers.getPropertiesByCity('Marrakech');

// Créer une réservation
const booking = await supabaseHelpers.createBooking(bookingData);
```

## Fonctionnalités

### 1. Authentification
- Inscription/Connexion par email
- Gestion des sessions
- Profils utilisateur personnalisés
- Rôles et permissions

### 2. Gestion des propriétés
- CRUD complet pour les propriétaires
- Système d'approbation pour les admins
- Recherche et filtrage
- Images multiples

### 3. Réservations
- Système de réservation complet
- Gestion des dates et disponibilités
- Calcul automatique des prix
- Statuts de réservation

### 4. Favoris et avis
- Système de favoris
- Avis et notes
- Calcul automatique des moyennes

## Développement

### 1. Accéder à Supabase Studio
```bash
supabase start
```
Puis ouvrir : http://localhost:54323

### 2. Accéder à la base de données
```bash
supabase db reset
```
Puis utiliser un client PostgreSQL pour se connecter à :
- Host: localhost
- Port: 54322
- Database: postgres
- User: postgres
- Password: postgres

### 3. Modifier le schéma
```bash
# Créer une nouvelle migration
supabase migration new nom_de_la_migration

# Appliquer les migrations
supabase db push
```

### 4. Données de test
Les données de test sont dans `supabase/seed.sql` et sont automatiquement chargées avec `supabase db reset`.

## Production

### 1. Déployer sur Supabase Cloud
```bash
# Lier le projet local à un projet cloud
supabase link --project-ref votre-project-ref

# Pousser les migrations
supabase db push

# Déployer les fonctions edge (si applicable)
supabase functions deploy
```

### 2. Variables d'environnement de production
```env
VITE_SUPABASE_URL=https://votre-project.supabase.co
VITE_SUPABASE_ANON_KEY=votre-anon-key
```

## Commandes utiles

```bash
# Démarrer Supabase
supabase start

# Arrêter Supabase
supabase stop

# Redémarrer Supabase
supabase restart

# Statut des services
supabase status

# Logs des services
supabase logs

# Réinitialiser la base de données
supabase db reset

# Appliquer les migrations
supabase db push

# Générer les types TypeScript
supabase gen types typescript --local > src/types/supabase.ts
```

## Dépannage

### 1. Docker ne démarre pas
- Vérifiez que Docker Desktop est démarré
- Redémarrez Docker Desktop
- Vérifiez les permissions

### 2. Ports déjà utilisés
```bash
# Vérifier les ports utilisés
lsof -i :54321
lsof -i :54322
lsof -i :54323

# Arrêter les processus qui utilisent ces ports
kill -9 <PID>
```

### 3. Erreurs de migration
```bash
# Réinitialiser complètement
supabase stop
supabase start
supabase db reset
```

## Support

Pour plus d'informations sur Supabase :
- Documentation : https://supabase.com/docs
- Discord : https://discord.supabase.com
- GitHub : https://github.com/supabase/supabase

