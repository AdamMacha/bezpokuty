'use client';

import { useLanguage } from '@/components/language-provider';
import { motion } from 'framer-motion';

export default function About() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {language === 'cs' ? 'O nás' : 'About Us'}
      </motion.h1>
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="mb-4">
          {language === 'cs'
            ? 'Pojištění na pokuty je inovativní společnost, která se specializuje na ochranu řidičů před neočekávanými výdaji spojenými s dopravními přestupky.'
            : 'Fine Insurance is an innovative company specializing in protecting drivers from unexpected expenses related to traffic violations.'}
        </p>
        <p className="mb-4">
          {language === 'cs'
            ? 'Naše mise je jednoduchá: poskytnout řidičům klid a jistotu na cestách. Chápeme, že každý může udělat chybu, a proto nabízíme komplexní pojistné krytí, které vás ochrání před finančními dopady pokut.'
            : 'Our mission is simple: to provide drivers with peace of mind on the road. We understand that everyone can make a mistake, which is why we offer comprehensive insurance coverage to protect you from the financial impact of fines.'}
        </p>
        <p>
          {language === 'cs'
            ? 'S naším pojištěním můžete jezdit s vědomím, že jste chráněni před nečekanými výdaji. Jsme tu pro vás 24/7, abychom vám poskytli podporu a pomoc, když ji potřebujete nejvíce.'
            : 'With our insurance, you can drive knowing that you are protected from unexpected expenses. We are here for you 24/7 to provide support and assistance when you need it most.'}
        </p>
      </motion.div>
    </div>
  );
}
