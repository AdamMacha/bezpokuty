"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useLanguage } from './language-provider';
import { Button } from './ui/button';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'cs' ? 'en' : 'cs');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-background shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Pojištění na pokuty
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" onClick={toggleLanguage}>
            {language === 'cs' ? 'EN' : 'CS'}
          </Button>
          <Link href="/about" className="text-foreground hover:text-primary transition-colors">
            {language === 'cs' ? 'O nás' : 'About'}
          </Link>
          <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
            {language === 'cs' ? 'Kontakt' : 'Contact'}
          </Link>
          <Link href="/purchase" className="text-foreground hover:text-primary transition-colors">
            {language === 'cs' ? 'Zakoupit' : 'Purchase'}
          </Link>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                {language === 'cs' ? 'O nás' : 'About'}
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                {language === 'cs' ? 'Kontakt' : 'Contact'}
              </Link>
              <Link href="/purchase" className="text-foreground hover:text-primary transition-colors">
                {language === 'cs' ? 'Zakoupit' : 'Purchase'}
              </Link>
              <Button variant="ghost" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                {language === 'cs' ? 'Změnit téma' : 'Toggle theme'}
              </Button>
              <Button variant="ghost" onClick={toggleLanguage}>
                {language === 'cs' ? 'Switch to English' : 'Přepnout do češtiny'}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;