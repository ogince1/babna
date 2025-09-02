# 🔧 CORRECTION DE LA LOGIQUE D'INSCRIPTION

## ❌ **PROBLÈME IDENTIFIÉ :**
L'erreur RLS persiste car nous essayons d'insérer dans `public.users` **avant** que l'utilisateur soit complètement authentifié.

## 🔍 **EXPLICATION TECHNIQUE :**

### **Séquence problématique actuelle :**
1. `supabase.auth.signUp()` → Crée l'utilisateur dans `auth.users`
2. **IMMÉDIATEMENT** → Tentative d'insertion dans `public.users`
3. ❌ **ÉCHEC** → `auth.uid()` n'est pas encore disponible pour RLS

### **Pourquoi ça échoue :**
- Les politiques RLS vérifient `auth.uid() = id`
- Mais `auth.uid()` n'est pas encore établi lors de l'insertion
- L'utilisateur n'est pas encore "connecté" au moment de l'insertion

## ✅ **SOLUTIONS POSSIBLES :**

### **Solution 1 : Créer le profil après confirmation email**
```typescript
// Dans useSupabaseAuth.ts
const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // NE PAS créer le profil ici
    // Attendre la confirmation email ou la première connexion
    
    console.log('✅ Inscription réussie, vérifiez votre email');
    return { data, error: null };
  } catch (error) {
    console.error('❌ Erreur d\'inscription:', error);
    return { data: null, error };
  }
};
```

### **Solution 2 : Créer le profil lors de la première connexion**
```typescript
// Dans loadUserProfile()
if (user && !profile) {
  try {
    // Créer le profil lors de la première connexion
    const { error: createError } = await supabase
      .from('users')
      .insert({
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || 'Utilisateur',
        role: 'client'
      });
    
    if (!createError) {
      // Recharger le profil
      const newProfile = await supabaseHelpers.getCurrentUser();
      setProfile(newProfile);
    }
  } catch (error) {
    console.error('❌ Erreur création profil:', error);
  }
}
```

### **Solution 3 : Désactiver temporairement RLS pour users**
```sql
-- Dans Supabase SQL Editor
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Créer une politique plus permissive
CREATE POLICY "Allow all operations for authenticated users" ON public.users
FOR ALL USING (auth.role() = 'authenticated');
```

## 🚀 **RECOMMANDATION :**

**Solution 2** est la plus sécurisée et logique :
- ✅ **Sécurité maintenue** (RLS actif)
- ✅ **Logique cohérente** (profil créé quand nécessaire)
- ✅ **Gestion d'erreur** robuste

## 📋 **ÉTAPES DE MISE EN ŒUVRE :**

1. **Modifier `signUp()`** pour ne pas créer le profil immédiatement
2. **Modifier `loadUserProfile()`** pour créer le profil si nécessaire
3. **Tester l'inscription** d'un nouveau compte
4. **Vérifier que le profil** se crée lors de la première connexion

## 🎯 **RÉSULTAT ATTENDU :**

- ✅ **Inscription** sans erreur RLS
- ✅ **Profil créé** lors de la première connexion
- ✅ **Authentification complète** fonctionnelle
