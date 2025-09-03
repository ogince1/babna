import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminDashboardComplete from '../components/Dashboard/AdminDashboardComplete';
import { useApp } from '../context/AppContext';
import { t } from '../utils/i18n';

const AdminDashboardPage: React.FC = () => {
  const { language } = useApp();

  return (
    <>
      <Helmet>
        <title>{t('adminDashboard', language)} - Babna.ma</title>
        <meta name="description" content="Tableau de bord administrateur pour la gestion complète de la plateforme Babna.ma" />
        <meta name="keywords" content="admin dashboard, gestion plateforme, modération, statistiques" />
        <link rel="canonical" href="https://babna.ma/admin/dashboard" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${t('adminDashboard', language)} - Babna.ma`} />
        <meta property="og:description" content="Tableau de bord administrateur pour la gestion complète de la plateforme Babna.ma" />
        <meta property="og:url" content="https://babna.ma/admin/dashboard" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={language === 'fr' ? 'fr_FR' : language === 'ar' ? 'ar_MA' : language === 'en' ? 'en_US' : 'es_ES'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t('adminDashboard', language)} - Babna.ma`} />
        <meta name="twitter:description" content="Tableau de bord administrateur pour la gestion complète de la plateforme Babna.ma" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <AdminDashboardComplete />
      </div>
    </>
  );
};

export default AdminDashboardPage;
