# 🔧 CORRECTION DU PROBLÈME D'INSCRIPTION

## ❌ **PROBLÈME IDENTIFIÉ :**
L'erreur `new row violates row-level security policy for table "users"` indique qu'il manque une politique RLS pour l'INSERTION dans la table `users`.

## ✅ **SOLUTION :**

### **Étape 1 : Aller dans Supabase Dashboard**
1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet : `ubanmapcosqapprxkjld`

### **Étape 2 : Ouvrir SQL Editor**
1. Dans le menu de gauche, cliquez sur **"SQL Editor"**
2. Cliquez sur **"New query"**

### **Étape 3 : Exécuter le SQL de correction**
Copiez et collez ce code SQL :

```sql
-- 1. Ajouter la politique manquante pour INSERT dans users
CREATE POLICY "Users can insert their own profile" ON public.users 
FOR INSERT WITH CHECK (auth.uid() = id);

-- 2. Ajouter la colonne whatsapp si elle n'existe pas
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS whatsapp TEXT;

-- 3. Vérifier que les politiques sont bien créées
SELECT 
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename = 'users'
ORDER BY policyname;
```

### **Étape 4 : Cliquer sur "Run"**
1. Cliquez sur le bouton **"Run"** (▶️)
2. Vérifiez que vous obtenez un résultat avec 3 politiques

### **Étape 5 : Tester l'inscription**
1. Retournez sur votre site Babna.ma
2. Essayez de créer un nouveau compte
3. L'inscription devrait maintenant fonctionner

## 🔍 **EXPLICATION TECHNIQUE :**

Le problème vient du fait que Supabase a activé **Row Level Security (RLS)** sur la table `users`, mais il manquait la politique pour permettre aux utilisateurs de créer leur propre profil.

**Politiques RLS existantes :**
- ✅ `SELECT` : Les utilisateurs peuvent voir leur propre profil
- ✅ `UPDATE` : Les utilisateurs peuvent modifier leur propre profil
- ❌ `INSERT` : **MANQUANTE** - Les utilisateurs ne peuvent pas créer leur profil

**Politique ajoutée :**
- ✅ `INSERT` : Les utilisateurs peuvent créer leur profil avec `auth.uid() = id`

## 📋 **VÉRIFICATION :**

Après avoir exécuté le SQL, vous devriez voir 3 politiques dans le résultat :
1. `Users can view their own profile` (SELECT)
2. `Users can update their own profile` (UPDATE)  
3. `Users can insert their own profile` (INSERT) ← **NOUVELLE**

## 🚀 **RÉSULTAT ATTENDU :**

L'inscription des nouveaux utilisateurs devrait maintenant fonctionner correctement sans erreur RLS !
