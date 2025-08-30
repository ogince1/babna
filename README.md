# 🏠 Babna.ma - Plateforme de Location d'Appartements au Maroc

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-orange.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC.svg)](https://tailwindcss.com/)

## 🌟 À Propos

**Babna.ma** est une plateforme moderne de location d'appartements au Maroc, conçue pour offrir une expérience utilisateur exceptionnelle avec un design responsive et des fonctionnalités avancées.

### ✨ Fonctionnalités Principales

- 🏠 **Location d'appartements** - Recherche et réservation d'appartements
- 🌍 **Multilingue** - Support complet (Français, Arabe, Anglais, Espagnol)
- 📱 **Responsive Design** - Optimisé pour tous les appareils
- 🔐 **Authentification** - Système de connexion sécurisé
- 📊 **Tableaux de bord** - Pour propriétaires et voyageurs
- 📝 **Blog et guides** - Contenu enrichi pour le SEO
- ⭐ **Système d'avis** - Témoignages clients
- ❓ **FAQ dynamiques** - Par ville et catégorie

## 🚀 Technologies Utilisées

### Frontend
- **React 18** - Interface utilisateur
- **TypeScript** - Typage statique
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Navigation
- **React Helmet** - Gestion SEO

### Backend & Base de Données
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Base de données
- **Row Level Security (RLS)** - Sécurité des données
- **Real-time subscriptions** - Mises à jour en temps réel

### SEO & Performance
- **Sitemap XML** - Optimisation pour les moteurs de recherche
- **Meta tags dynamiques** - SEO multilingue
- **Hreflang** - Gestion des langues
- **Lazy loading** - Performance optimisée

## 📦 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Supabase

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/ogince1/babna.git
cd babna
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Supabase**
```bash
# Copier le fichier d'exemple
cp env.example .env

# Configurer les variables d'environnement
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon
```

4. **Initialiser Supabase**
```bash
# Installer Supabase CLI
npm install -g supabase

# Initialiser le projet
supabase init

# Démarrer Supabase localement
supabase start

# Appliquer les migrations
supabase db reset
```

5. **Démarrer l'application**
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:5173`

## 🗄️ Structure de la Base de Données

### Tables Principales
- `properties` - Appartements à louer
- `users` - Utilisateurs (propriétaires/voyageurs)
- `bookings` - Réservations
- `faqs` - Questions fréquentes
- `testimonials` - Avis clients
- `blog_posts` - Articles de blog
- `travel_guides` - Guides de voyage

### Sécurité
- **Row Level Security (RLS)** activé sur toutes les tables
- **Politiques d'accès** basées sur les rôles utilisateur
- **Authentification** sécurisée avec Supabase Auth

## 🌍 Fonctionnalités Multilingues

### Langues Supportées
- 🇫🇷 **Français** - Langue principale
- 🇲🇦 **العربية** - Arabe (RTL)
- 🇺🇸 **English** - Anglais
- 🇪🇸 **Español** - Espagnol

### Fonctionnalités
- **URLs localisées** - `/fr/appartements`, `/ar/appartements`
- **Contenu traduit** - Interface et contenu
- **SEO multilingue** - Meta tags et sitemap
- **Sélecteur de langue** - Dans le footer

## 📱 Interface Utilisateur

### Design System
- **Tailwind CSS** - Classes utilitaires
- **Responsive** - Mobile-first approach
- **Accessibilité** - WCAG 2.1 compliant
- **Performance** - Optimisé pour la vitesse

### Composants Principaux
- `Header` - Navigation principale
- `Footer` - Liens et sélecteur de langue
- `Sidebar` - Menu utilisateur (connecté uniquement)
- `PropertyCard` - Carte d'appartement
- `AuthModal` - Modal d'authentification

## 🔧 Scripts Disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement
npm run build        # Build de production
npm run preview      # Prévisualiser le build

# Base de données
supabase start       # Démarrer Supabase local
supabase stop        # Arrêter Supabase local
supabase db reset    # Réinitialiser la base de données

# Linting
npm run lint         # Vérifier le code
npm run lint:fix     # Corriger automatiquement
```

## 📊 Fonctionnalités Avancées

### SEO
- **Sitemap XML** généré automatiquement
- **Meta tags** dynamiques par page
- **Open Graph** pour les réseaux sociaux
- **Twitter Cards** optimisées
- **Hreflang** pour le SEO multilingue

### Performance
- **Code splitting** automatique
- **Lazy loading** des composants
- **Optimisation des images**
- **Cache intelligent**

### Sécurité
- **Authentification** sécurisée
- **Autorisation** basée sur les rôles
- **Validation** des données
- **Protection CSRF**

## 🤝 Contribution

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact

- **Site web** : [https://babna.ma](https://babna.ma)
- **Email** : support@babna.ma
- **GitHub** : [https://github.com/ogince1/babna](https://github.com/ogince1/babna)

## 🙏 Remerciements

- **Supabase** pour l'infrastructure backend
- **Vite** pour l'outil de build
- **Tailwind CSS** pour le framework CSS
- **React** pour la bibliothèque UI

---

**Développé avec ❤️ pour le Maroc**
