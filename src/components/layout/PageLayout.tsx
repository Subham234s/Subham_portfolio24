import { motion } from 'motion/react';
import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (title) {
      document.title = `${title} | Subham Singh`;
    }
  }, [title]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F7FB] text-[#111827] dark:bg-[#080B14] dark:text-[#F8FAFC]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[#0789A7] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white dark:focus:bg-[#38D6F2] dark:focus:text-[#080B14]"
      >
        Skip to main content
      </a>

      <Navbar />

      <motion.main
        id="main-content"
        key={location.pathname}
        initial={{ opacity: 1, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  );
}
