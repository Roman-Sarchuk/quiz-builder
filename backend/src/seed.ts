import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const count = await prisma.quiz.count();
  if (count > 0) {
    console.log('Database already seeded. Skipping.');
    return;
  }

  await prisma.quiz.create({
    data: {
      title: 'Full-Stack Developer Challenge',
      questions: {
        create: [
          {
            type: 'BOOLEAN',
            text: 'Docker uses containers to package applications.',
            order: 0,
          },
          {
            type: 'INPUT',
            text: 'What does ORM stand for?',
            answers: 'Object-Relational Mapping',
            order: 1,
          },
          {
            type: 'CHECKBOX',
            text: 'Which of the following are React hooks?',
            options: ['useState', 'useDatabase', 'useEffect', 'useRender'],
            answers: ['useState', 'useEffect'],
            order: 2,
          },
        ],
      },
    },
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });