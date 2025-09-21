"use client";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Section from "../components/Section";
import Image from "next/image";
import { useEffect, useState } from "react";

type Service = { id: string; name: string; description: string };
type Post = { id: string; title: string; content: string; slug: string };

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch("/api/services").then(res => res.json()).then(setServices);
    fetch("/api/posts").then(res => res.json()).then(setPosts);
  }, []);
  return (
    <Layout>
      <Hero>
        <div className="flex flex-col items-center justify-center animate-fade-in bg-gray-900 rounded-xl shadow-lg p-8 text-white">
          <Image
            src="/business-hero.jpg"
            alt="Business Team"
            width={400}
            height={250}
            className="rounded-xl shadow-lg mb-6"
          />
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg text-white animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text">
            Empowering Your Business
          </h1>
          <p className="text-xl mb-8 text-gray-300 animate-fade-in">
            We help companies grow, innovate, and succeed with tailored solutions
            and expert guidance.
          </p>
          <a
            href="/contact"
            className="bg-gray-800 text-blue-400 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 animate-bounce"
          >
            Get in Touch
          </a>
        </div>
      </Hero>
      <Section>
        <h2 className="text-2xl font-bold mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.length === 0 ? (
            <div className="col-span-3 text-gray-400 text-center">No services found.</div>
          ) : (
            services.map(service => (
              <div key={service.id} className="bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform duration-300 text-white">
                <h2 className="text-xl font-bold mb-2">{service.name}</h2>
                <p className="text-gray-300 mb-4">{service.description}</p>
              </div>
            ))
          )}
        </div>
      </Section>
      <Section>
        <h2 className="text-2xl font-bold mb-6 text-center">Latest Insights</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {posts.length === 0 ? (
            <div className="text-gray-400 text-center w-full">No blog posts found.</div>
          ) : (
            posts.slice(0, 3).map(post => (
              <div key={post.id} className="bg-gray-900 rounded-xl shadow-lg p-6 w-full md:w-1/3 hover:scale-105 transition-transform duration-300 animate-fade-in text-white">
                <h3 className="text-lg font-bold mb-2 text-white">{post.title}</h3>
                <p className="text-gray-300 mb-4">{post.content.slice(0, 100)}...</p>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-blue-400 hover:underline"
                >
                  Read More
                </a>
              </div>
            ))
          )}
        </div>
      </Section>
    </Layout>
  );
}
