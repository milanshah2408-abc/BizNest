import Layout from '../../components/Layout';
import Section from '../../components/Section';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <Layout>
      <Section>
  <div className="flex flex-col md:flex-row items-center gap-8 animate-fade-in bg-gray-900 rounded-xl shadow-lg p-8">
          <Image src="/team.jpg" alt="Our Team" width={350} height={220} className="rounded-xl shadow-lg" />
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">About Us</h2>
            <p className="text-lg text-gray-300 mb-4">We are a passionate team of business experts, marketers, and developers dedicated to helping companies grow and succeed. Our mission is to deliver high-quality solutions tailored to your needs, with a focus on innovation, integrity, and measurable results.</p>
            <ul className="list-disc ml-6 text-gray-400">
              <li>10+ years of industry experience</li>
              <li>Trusted by 100+ businesses worldwide</li>
              <li>Results-driven, client-focused approach</li>
            </ul>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
