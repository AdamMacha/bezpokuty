"use client"

import { useLanguage } from '@/components/language-provider';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Map from '@/components/map';

export default function Contact() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {language === 'cs' ? 'Kontaktujte nás' : 'Contact Us'}
      </motion.h1>
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'cs' ? 'Napište nám' : 'Get in Touch'}
          </h2>
          <form className="space-y-4">
            <Input placeholder={language === 'cs' ? 'Vaše jméno' : 'Your Name'} />
            <Input type="email" placeholder={language === 'cs' ? 'Váš email' : 'Your Email'} />
            <Textarea placeholder={language === 'cs' ? 'Vaše zpráva' : 'Your Message'} />
            <Button type="submit">
              {language === 'cs' ? 'Odeslat' : 'Send'}
            </Button>
          </form>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            {language === 'cs' ? 'Kde nás najdete' : 'Where to Find Us'}
          </h2>
          <p className="mb-4">
            {language === 'cs' ? 'Naše adresa:' : 'Our Address:'}
            <br />
            Pojištění na pokuty s.r.o.
            <br />
            Václavské náměstí 1
            <br />
            110 00 Praha 1
            <br />
            Česká republika
          </p>
        </motion.div>
      </div>
    </div>
  );
}