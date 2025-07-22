import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedUsers() {
  console.log('[SEED] Criando usuario administrador...');
  const adminPassword = await bcrypt.hash('admin123456', 10);
  await prisma.user.create({
    data: {
      email: 'admin@sistema.com',
      password: adminPassword,
      name: 'Administrador do Sistema',
      role: Role.ADMIN,
    },
  });

  console.log('[SEED] Criando usuario comum...');
  const userPassword = await bcrypt.hash('123456', 10);
  await prisma.user.create({
    data: {
      email: 'user@sistema.com',
      password: userPassword,
      name: 'Usuario Comum',
      role: Role.USER,
    },
  });
}

async function seedStudents() {
  const studentsData = [
    {
      name: 'Ana Silva Santos',
      email: 'ana.silva@email.com',
      ra: '2024001001',
      cpf: '12345678901',
    },
    {
      name: 'Carlos Eduardo Lima',
      email: 'carlos.lima@email.com',
      ra: '2024001002',
      cpf: '23456789012',
    },
    {
      name: 'Fernanda Costa Oliveira',
      email: 'fernanda.costa@email.com',
      ra: '2024001003',
      cpf: '34567890123',
    },
    {
      name: 'João Pedro Almeida',
      email: 'joao.almeida@email.com',
      ra: '2024001004',
      cpf: '45678901234',
    },
    {
      name: 'Mariana Rodrigues Silva',
      email: 'mariana.rodrigues@email.com',
      ra: '2024001005',
      cpf: '56789012345',
    },
  ];

  for (let i = 0; i < studentsData.length; i++) {
    const studentData = studentsData[i];
    console.log(`[SEED] Criando aluno ${i + 1}/${studentsData.length}...`);

    await prisma.student.create({
      data: studentData,
    });
  }
}

async function seed() {
  try {
    console.log('[SEED] ====================================');
    console.log('[SEED] Iniciando processo de seed');
    console.log('[SEED] ====================================');

    const users = await seedUsers();

    await seedStudents();

    console.log('[SEED] ====================================');
    console.log('[SEED] Seed concluido com sucesso');
    console.log('[SEED] ====================================');
    console.log('');
    console.log('CREDENCIAIS PARA TESTE:');
    console.log('=======================');
    console.log('ADMINISTRADOR:');
    console.log('  Email: admin@sistema.com');
    console.log('  Senha: admin123456');
    console.log('');
    console.log('USUARIO COMUM:');
    console.log('  Email: user@sistema.com');
    console.log('  Senha: 123456');
    console.log('=======================');
    console.log('');
    console.log('DADOS CRIADOS:');
    console.log('- 2 usuarios (1 admin, 1 comum)');
    console.log('- 5 alunos cadastrados');
    console.log('');
  } catch (error) {
    console.error('[SEED] Erro durante execucao:', error);
    throw error;
  }
}

seed()
  .catch((error) => {
    console.error('[SEED] Falha no processo de seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    console.log('[SEED] Desconectando do banco de dados...');
    await prisma.$disconnect();
    console.log('[SEED] Desconectado com sucesso');
  });
