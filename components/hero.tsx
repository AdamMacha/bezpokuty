"use client"

import { useLanguage } from './language-provider';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import Image from 'next/image';

const Hero = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 mb-8 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'cs'
              ? 'Ochraňte se před pokutami'
              : 'Protect Yourself from Fines'}
          </h1>
          <p className="text-xl mb-8">
            {language === 'cs'
              ? 'Naše pojištění vás chrání před neočekávanými výdaji za pokuty. Buďte v klidu a jezděte bez obav.'
              : 'Our insurance protects you from unexpected fine expenses. Drive with peace of mind.'}
          </p>
          <Button size="lg">
            {language === 'cs' ? 'Zjistit více' : 'Learn More'}
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2"
        >
          <Image
            src="https://images.unsplash.com/photo-1592853625601-bb9d23da12fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt={language === 'cs' ? 'Bezpečná jízda' : 'Safe driving'}
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;