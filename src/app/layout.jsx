import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Madrasa Management Software',
  description: 'আধুনিক মাদ্রাসা ম্যানেজমেন্ট সফটওয়্যার। ছাত্র-ছাত্রী, শিক্ষক, হাজিরা, ভর্তি, বেতন, খোরাকী, রেজাল্ট, দান, যাকাত, হিসাব-নিকাশ, রিপোর্ট ও SMS ব্যবস্থাপনা সহজে পরিচালনা করুন।',
  keywords: 'Madrasa Management Software, Madrasa Software, Madrasah Management System, মাদ্রাসা সফটওয়্যার, মাদ্রাসা ম্যানেজমেন্ট, ছাত্র ব্যবস্থাপনা, শিক্ষক ব্যবস্থাপনা, মাদ্রাসা হিসাব, হাজিরা, রেজাল্ট, ভর্তি, বেতন, দান, যাকাত',
  authors: [{ name: 'Madrasa Management Software' }],
  icons: {
    icon: '/storage/institute/logos/madrasha_360_logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/storage/institute/logos/madrasha_360_logo.png" />

        {/* Animation css */}
        <link rel="stylesheet" href="/assets/vendor/animation/animate.min.css" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />

        {/* Tabler Icons */}
        <link rel="stylesheet" type="text/css" href="/assets/vendor/tabler-icons/tabler-icons.css" />

        {/* Apexcharts css */}
        <link rel="stylesheet" type="text/css" href="/assets/vendor/apexcharts/apexcharts.css" />

        {/* Bootstrap css */}
        <link rel="stylesheet" type="text/css" href="/assets/vendor/bootstrap/bootstrap.min.css" />

        {/* Simplebar css */}
        <link rel="stylesheet" type="text/css" href="/assets/vendor/simplebar/simplebar.css" />

        {/* App css */}
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />

        {/* Responsive css */}
        <link rel="stylesheet" type="text/css" href="/assets/css/responsive.css" />

        {/* Font Awesome css (exact local vendor) */}
        <link rel="stylesheet" href="/assets/vendor/fontawesome/css/all.css" />

        {/* Phosphor Icons */}
        <link rel="stylesheet" type="text/css" href="/assets/vendor/phosphor/regular/style.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/phosphor/bold/style.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/phosphor/duotone/style.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/phosphor/thin/style.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/phosphor/light/style.css" />
        <link rel="stylesheet" type="text/css" href="/assets/vendor/phosphor/fill/style.css" />

        <style>{`
          @font-face {
            font-family: 'SolaimanLipi';
            src: url('/fonts/SolaimanLipi.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          body {
            font-family: 'SolaimanLipi', 'Noto Sans Bengali', sans-serif;
            background-color: var(--bodybg-color, #f6f7fa);
            color: var(--font-color, #082f32);
          }
        `}</style>
      </head>
      <body>
        <div id="root">
          {children}
        </div>

        {/* Font Awesome JS */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/js/all.min.js"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />

        {/* Apexcharts JS */}
        <Script
          src="/assets/vendor/apexcharts/apexcharts.min.js"
          strategy="afterInteractive"
        />

        {/* SweetAlert2 (1:1 matching madrasha.hostzonebd.com) */}
        <Script
          src="https://cdn.jsdelivr.net/npm/sweetalert2@11"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
