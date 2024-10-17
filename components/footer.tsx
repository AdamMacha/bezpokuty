"use client"

import { useLanguage } from './language-provider';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-background shadow-md mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">
              {language === 'cs' ? 'Pojištění na pokuty' : 'Fine Insurance'}
            </h3>
            <p className="text-muted-foreground">
              {language === 'cs'
                ? 'Chráníme vás před neočekávanými výdaji.'
                : 'We protect you from unexpected expenses.'}
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">
              {language === 'cs' ? 'Kontaktujte nás' : 'Contact Us'}
            </h4>
            <p>Email: info@pojistenipokuty.cz</p>
            <p>{language === 'cs' ? 'Telefon' : 'Phone'}: +420 123 456 789</p>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">
              {language === 'cs' ? 'Sledujte nás' : 'Follow Us'}
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <p>
            &copy; 2023 {language === 'cs' ? 'Pojištění na pokuty' : 'Fine Insurance'}.{' '}
            {language === 'cs' ? 'Všechna práva vyhrazena.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;