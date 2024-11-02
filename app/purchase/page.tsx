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
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Purchase() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    street: '',
    city: '',
    zipCode: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Create Stripe Checkout Session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageType: selectedPackage,
          formData: {
            ...formData,
            purchased: false, // Will be updated to true after successful payment
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: language === 'cs' ? 'Chyba' : 'Error',
        description: language === 'cs'
          ? 'Při zpracování platby došlo k chybě. Zkuste to prosím znovu.'
          : 'There was an error processing your payment. Please try again.',
        variant: 'destructive',
      });
    }
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
<form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="firstName">
              {language === 'cs' ? 'Jméno' : 'First Name'}
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="lastName">
              {language === 'cs' ? 'Příjmení' : 'Last Name'}
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="phone">
              {language === 'cs' ? 'Telefon' : 'Phone'}
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="street">
              {language === 'cs' ? 'Ulice' : 'Street'}
            </Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="city">
              {language === 'cs' ? 'Město' : 'City'}
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="zipCode">
              {language === 'cs' ? 'PSČ' : 'ZIP Code'}
            </Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
            />
          </div>
          <Button type="submit" className='w-full'>
            {language === 'cs' ? 'Odeslat' : 'Buy now'}
          </Button>
      </form>
      </motion.div>
    </div>
  );
}
