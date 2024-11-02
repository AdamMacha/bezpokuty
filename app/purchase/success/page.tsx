'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/components/language-provider';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function Success() {
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const sessionId = searchParams.get('session_id');
  const [error, setError] = useState<string | null>(null);
  const hasOrderBeenSaved = useRef(false);

  useEffect(() => {
    const saveOrder = async () => {
      if (sessionId && !hasOrderBeenSaved.current) {
        hasOrderBeenSaved.current = true;
        try {
          console.log('Fetching session data from Stripe...');
          const stripeResponse = await fetch(`/api/checkout-session?sessionId=${sessionId}`);
          if (!stripeResponse.ok) {
            console.error('Stripe response not OK:', await stripeResponse.text());
            throw new Error('Failed to retrieve session data');
          }
          
          const sessionData = await stripeResponse.json();
          console.log('Session data retrieved:', sessionData);
          const { metadata } = sessionData;

          console.log('Saving order to database...');
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName: metadata.firstName,
              lastName: metadata.lastName,
              email: metadata.email,
              phone: metadata.phone,
              street: metadata.street,
              city: metadata.city,
              zipCode: metadata.zipCode,
              purchased: true,
              stripeSessionId: sessionId,
            }),
          });

          if (!response.ok) {
            console.error('Database response not OK:', await response.text());
            throw new Error('Failed to save order');
          }
          
          console.log('Order saved successfully');

          // Send confirmation email
          console.log('Sending confirmation email...');
          const emailResponse = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: metadata.email,
              firstName: metadata.firstName,
              lastName: metadata.lastName,
              language,
            }),
          });

          if (!emailResponse.ok) {
            console.error('Failed to send confirmation email:', await emailResponse.text());
          } else {
            console.log('Confirmation email sent successfully');
          }

        } catch (error) {
          console.error('Detailed error:', error);
          setError(language === 'cs' 
            ? 'Při ukládání objednávky došlo k chybě. Kontaktujte prosím podporu.'
            : 'There was an error saving your order. Please contact support.');
        }
      }
    };

    saveOrder();
  }, [sessionId, language]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">
          {language === 'cs' ? 'Platba byla úspěšná!' : 'Payment Successful!'}
        </h1>
        <p className="text-gray-600">
          {error || (language === 'cs'
            ? 'Děkujeme za váš nákup. Brzy vás budeme kontaktovat s dalšími informacemi.'
            : 'Thank you for your purchase. We will contact you soon with further information.')}
        </p>
      </motion.div>
    </div>
  );
} 