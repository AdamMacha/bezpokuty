'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function Purchase() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // including integrating with Stripe for payment processing
    toast({
      title: language === 'cs' ? 'Objednávka odeslána' : 'Order Submitted',
      description:
        language === 'cs'
          ? 'Děkujeme za vaši objednávku. Brzy vás budeme kontaktovat.'
          : 'Thank you for your order. We will contact you soon.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {language === 'cs' ? 'Zakoupit pojištění' : 'Purchase Insurance'}
      </motion.h1>
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="package">
              {language === 'cs' ? 'Vyberte balíček' : 'Select Package'}
            </Label>
            <Select onValueChange={setSelectedPackage} required>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    language === 'cs' ? 'Vyberte balíček' : 'Select a package'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">
                  {language === 'cs' ? 'Základní' : 'Basic'}
                </SelectItem>
                <SelectItem value="premium">
                  {language === 'cs' ? 'Premium' : 'Premium'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="email">
              {language === 'cs' ? 'Email' : 'Email'}
            </Label>
            <Input type="email" id="email" required />
          </div>
          <div>
            <Label htmlFor="firstName">
              {language === 'cs' ? 'Jméno' : 'First Name'}
            </Label>
            <Input id="firstName" required />
          </div>
          <div>
            <Label htmlFor="lastName">
              {language === 'cs' ? 'Příjmení' : 'Last Name'}
            </Label>
            <Input id="lastName" required />
          </div>
          <div>
            <Label htmlFor="phone">
              {language === 'cs' ? 'Telefon' : 'Phone'}
            </Label>
            <Input id="phone" required />
          </div>
          <div>
            <Label htmlFor="street">
              {language === 'cs'
                ? 'Ulice a číslo popisné'
                : 'Street and House Number'}
            </Label>
            <Input id="street" required />
          </div>
          <div>
            <Label htmlFor="city">{language === 'cs' ? 'Město' : 'City'}</Label>
            <Input id="city" required />
          </div>
          <div>
            <Label htmlFor="zipCode">
              {language === 'cs' ? 'PSČ' : 'ZIP Code'}
            </Label>
            <Input id="zipCode" required />
          </div>
          <Button type="submit" className="w-full">
            {language === 'cs' ? 'Zakoupit nyní' : 'Buy Now'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
