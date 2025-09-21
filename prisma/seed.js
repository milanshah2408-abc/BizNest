const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const password = await bcrypt.hash('demo1234', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Demo Admin',
      email: 'admin@business.com',
      password,
    },
  });

  // Create demo blog posts
  await prisma.post.createMany({
    data: [
      {
        title: 'How to Scale Your Business in 2025',
        slug: 'scale-business-2025',
        content: 'Discover proven strategies for sustainable growth and innovation in the modern business landscape. Learn how to leverage technology, optimize operations, and build a resilient team for long-term success.',
        authorId: user.id,
      },
      {
        title: 'Digital Marketing Trends',
        slug: 'marketing-trends',
        content: 'Stay ahead with the latest marketing tactics and tools. Explore new channels, automation, and data-driven strategies to reach your audience and grow your brand.',
        authorId: user.id,
      },
      {
        title: 'Building a Winning Team',
        slug: 'winning-team',
        content: 'Tips for hiring, training, and retaining top talent. Create a culture of excellence and collaboration to drive your business forward.',
        authorId: user.id,
      },
    ],
  });

  // Create demo services
  await prisma.service.createMany({
    data: [
      {
        name: 'Business Consulting',
        description: 'Expert advice to optimize your strategy and operations.',
        userId: user.id,
      },
      {
        name: 'Digital Marketing',
        description: 'Grow your brand and reach new customers online.',
        userId: user.id,
      },
      {
        name: 'Web Development',
        description: 'Custom websites and apps to power your business.',
        userId: user.id,
      },
    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());