"use client"

import { useLanguage } from './language-provider';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const InsurancePackages = () => {
  const { language } = useLanguage();

  const packages = [
    {
      title: language === 'cs' ? 'Základní' : 'Basic',
      description: language === 'cs' ? 'Pro příležitostné řidiče' : 'For occasional drivers',
      price: language === 'cs' ? '299 Kč/měsíc' : '€12/month',
      features: [
        language === 'cs' ? 'Krytí pokut do 5 000 Kč' : 'Coverage for fines up to €200',
        language === 'cs' ? 'Základní právní poradenství' : 'Basic legal advice',
        language === 'cs' ? 'Měsíční výpověď' : 'Monthly cancellation',
      ],
    },
    {
      title: language === 'cs' ? 'Premium' : 'Premium',
      description: language === 'cs' ? 'Pro časté řidiče' : 'For frequent drivers',
      price: language === 'cs' ? '599 Kč/měsíc' : '€24/month',
      features: [
        language === 'cs' ? 'Krytí pokut do 15 000 Kč' : 'Coverage for fines up to €600',
        language === 'cs' ? 'Rozšířené právní poradenství' : 'Extended legal advice',
        language === 'cs' ? 'Asistence při odvolání' : 'Appeal assistance',
        language === 'cs' ? 'Bez spoluúčasti' : 'No deductible',
      ],
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === 'cs' ? 'Naše pojistné balíčky' : 'Our Insurance Packages'}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{pkg.title}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-3xl font-bold mb-6">{pkg.price}</p>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/purchase" className="w-full">
                    <Button className="w-full">
                      {language === 'cs' ? 'Zakoupit' : 'Purchase'}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsurancePackages;