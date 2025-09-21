import Layout from '../../components/Layout';
import Section from '../../components/Section';
import ContactForm from '../../components/ContactForm';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <Layout>
      <Section>
          <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-900 rounded-xl shadow-lg p-8">
          <Image src="/contact.jpg" alt="Contact" width={350} height={220} className="rounded-xl shadow-lg" />
          <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h2>
              <p className="text-lg mb-4 text-gray-300 dark:text-white">Have questions or want to work with us? Fill out the form and we’ll get back to you soon.</p>
            <ContactForm />
          </div>
        </div>
      </Section>
    </Layout>
  );
}
