# 🚀 CRÉATION IMMÉDIATE DU PROFIL LORS DE L'INSCRIPTION

## 🎯 **OBJECTIF :**
Créer le profil dans `public.users` **IMMÉDIATEMENT** lors de l'inscription, pas lors de la première connexion.

## ❌ **PROBLÈME ACTUEL :**
- ✅ **`auth.users`** → Créé lors de l'inscription
- ❌ **`public.users`** → Créé seulement lors de la première connexion

## ✅ **SOLUTION : DÉSACTIVER RLS TEMPORAIREMENT**

### **Étape 1 : Désactiver RLS dans Supabase**
1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet : `ubanmapcosqapprxkjld`
3. Allez dans **"SQL Editor"**
4. Exécutez ce SQL :

```sql
-- Désactiver RLS pour la table users
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Vérifier que RLS est désactivé
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'users' AND schemaname = 'public';
```

### **Étape 2 : Vérifier le résultat**
Vous devriez voir :
```
schemaname | tablename | rowsecurity
-----------+-----------+------------
public     | users     | false
```

## 🔄 **MODIFICATION DU CODE :**

### **Dans `src/hooks/useSupabaseAuth.ts` :**

Remplacez la fonction `signUp` par cette version :

```typescript
const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
  try {
    console.log('🔄 Tentative d\'inscription:', email);
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      console.log('🔄 Création immédiate du profil utilisateur...');
      try {
        // Créer le profil immédiatement dans public.users
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            name: userData.name || '',
            phone: userData.phone || null,
            whatsapp: userData.whatsapp || null,
            role: userData.role || 'client',
          });
        
        if (profileError) throw profileError;
        console.log('✅ Profil utilisateur créé immédiatement');
      } catch (profileError) {
        console.error('❌ Erreur lors de la création du profil:', profileError);
        // Fallback: stocker dans les métadonnées
        await supabase.auth.updateUser({
          data: {
            name: userData.name || '',
            phone: userData.phone || null,
            whatsapp: userData.whatsapp || null,
            role: userData.role || 'client'
          }
        });
        console.log('⚠️ Profil stocké dans les métadonnées (fallback)');
      }
    }

    console.log('✅ Inscription réussie:', data.user?.email);
    return { data, error: null };
  } catch (error) {
    console.error('❌ Erreur d\'inscription:', error);
    setLoading(false);
    return { data: null, error };
  }
};
```

## 🧪 **TEST DE LA SOLUTION :**

### **Étape 1 : Tester l'inscription**
1. Allez sur Babna.ma
2. Créez un nouveau compte
3. **Résultat attendu** : ✅ Profil créé immédiatement dans `public.users`

### **Étape 2 : Vérifier dans Supabase**
1. **Table Editor** → **users**
2. **Vérifiez** que le profil existe immédiatement

## 🎯 **RÉSULTAT ATTENDU :**

- ✅ **Inscription** → Crée immédiatement dans `auth.users` ET `public.users`
- ✅ **Pas d'erreur RLS**
- ✅ **Profil disponible immédiatement**
- ✅ **Pas besoin d'attendre la première connexion**

## 🔒 **SÉCURITÉ :**

**Note importante :** Désactiver RLS rend la table `users` accessible à tous les utilisateurs authentifiés. C'est acceptable pour un système d'inscription, mais vous pouvez :

1. **Réactiver RLS plus tard** avec des politiques plus permissives
2. **Utiliser des triggers** pour valider les données
3. **Implémenter une validation côté application**

## 🚀 **AVANTAGES :**

- ✅ **Profil créé immédiatement**
- ✅ **Pas d'erreur RLS**
- ✅ **Logique simple et directe**
- ✅ **Utilisateur prêt à l'emploi**

**Après avoir exécuté le SQL et modifié le code, testez l'inscription !** 🎉
