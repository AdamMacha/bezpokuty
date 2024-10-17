import Hero from '@/components/hero';
import InsurancePackages from '@/components/insurance-packages';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <InsurancePackages />
    </div>
  );
}