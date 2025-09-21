"use client";
import Layout from '../../components/Layout';
import Section from '../../components/Section';
import Image from 'next/image';

import { useEffect, useState } from 'react';

type Service = { id: string; name: string; description: string };

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/services').then(res => res.json()).then(data => {
      setServices(data);
      setLoading(false);
    });
  }, []);
  return (
    <Layout>
      <Section>
        <h2 className="text-3xl font-bold mb-8 text-white text-center">Our Services</h2>
        {loading ? (
          <div className="text-gray-400 text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <div className="col-span-3 text-gray-400 text-center">No services found.</div>
            ) : (
              services.map(service => (
                <div key={service.id} className="bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 animate-fade-in">
                  <h3 className="text-xl font-bold mb-2 text-white">{service.name}</h3>
                  <p className="text-gray-300 mb-4 text-center">{service.description}</p>
                </div>
              ))
            )}
          </div>
        )}
      </Section>
    </Layout>
  );
}
