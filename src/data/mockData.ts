import type { User, UserLevel, AccountType, DashboardStats } from '@/types';

export const userLevels: UserLevel[] = [
  {
    id: '1',
    name: 'Administrador',
    description: 'Acesso total ao sistema, pode gerenciar todos os usuários e configurações',
    color: '#ef4444',
    permissions: ['users.create', 'users.edit', 'users.delete', 'users.view', 'settings.manage', 'reports.view', 'billing.manage'],
    priority: 100
  },
  {
    id: '2',
    name: 'Gerente',
    description: 'Pode gerenciar usuários da sua equipe e visualizar relatórios',
    color: '#f97316',
    permissions: ['users.create', 'users.edit', 'users.view', 'reports.view'],
    priority: 80
  },
  {
    id: '3',
    name: 'Supervisor',
    description: 'Supervisiona operações e pode editar usuários de nível inferior',
    color: '#eab308',
    permissions: ['users.edit', 'users.view', 'reports.view'],
    priority: 60
  },
  {
    id: '4',
    name: 'Analista',
    description: 'Acesso a relatórios e dados para análise',
    color: '#3b82f6',
    permissions: ['users.view', 'reports.view'],
    priority: 40
  },
  {
    id: '5',
    name: 'Usuário',
    description: 'Acesso básico ao sistema',
    color: '#22c55e',
    permissions: ['users.view'],
    priority: 20
  }
];

export const accountTypes: AccountType[] = [
  {
    id: '1',
    name: 'Enterprise',
    description: 'Plano empresarial completo com todos os recursos',
    color: '#8b5cf6',
    features: ['API Access', 'Priority Support', 'Custom Integrations', 'Unlimited Storage', 'Advanced Analytics', 'SSO'],
    maxUsers: 1000,
    price: 999.90
  },
  {
    id: '2',
    name: 'Premium',
    description: 'Plano premium com recursos avançados',
    color: '#ec4899',
    features: ['API Access', 'Priority Support', '100GB Storage', 'Advanced Analytics', 'Custom Reports'],
    maxUsers: 100,
    price: 299.90
  },
  {
    id: '3',
    name: 'Business',
    description: 'Plano ideal para pequenas empresas',
    color: '#06b6d4',
    features: ['Email Support', '50GB Storage', 'Basic Analytics', 'Team Collaboration'],
    maxUsers: 25,
    price: 99.90
  },
  {
    id: '4',
    name: 'Basic',
    description: 'Plano básico para iniciantes',
    color: '#64748b',
    features: ['Community Support', '10GB Storage', 'Basic Features'],
    maxUsers: 5,
    price: 29.90
  },
  {
    id: '5',
    name: 'Trial',
    description: 'Período de teste gratuito',
    color: '#84cc16',
    features: ['Limited Access', '5GB Storage', '14 Days Trial'],
    maxUsers: 3,
    price: 0
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    levelId: '1',
    accountTypeId: '1',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-03-26T08:45:00Z',
    phone: '+55 11 98765-4321',
    department: 'TI'
  },
  {
    id: '2',
    name: 'Carlos Santos',
    email: 'carlos.santos@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    levelId: '2',
    accountTypeId: '1',
    status: 'active',
    createdAt: '2024-01-20T14:20:00Z',
    lastLogin: '2024-03-25T16:30:00Z',
    phone: '+55 11 91234-5678',
    department: 'Vendas'
  },
  {
    id: '3',
    name: 'Mariana Costa',
    email: 'mariana.costa@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
    levelId: '2',
    accountTypeId: '2',
    status: 'active',
    createdAt: '2024-02-01T09:00:00Z',
    lastLogin: '2024-03-26T10:15:00Z',
    phone: '+55 11 99876-5432',
    department: 'Marketing'
  },
  {
    id: '4',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    levelId: '3',
    accountTypeId: '2',
    status: 'active',
    createdAt: '2024-02-10T11:30:00Z',
    lastLogin: '2024-03-24T14:00:00Z',
    phone: '+55 11 92345-6789',
    department: 'Operações'
  },
  {
    id: '5',
    name: 'Juliana Lima',
    email: 'juliana.lima@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana',
    levelId: '4',
    accountTypeId: '3',
    status: 'active',
    createdAt: '2024-02-15T13:45:00Z',
    lastLogin: '2024-03-23T09:30:00Z',
    phone: '+55 11 93456-7890',
    department: 'Financeiro'
  },
  {
    id: '6',
    name: 'Ricardo Mendes',
    email: 'ricardo.mendes@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo',
    levelId: '4',
    accountTypeId: '3',
    status: 'inactive',
    createdAt: '2024-02-20T10:00:00Z',
    lastLogin: '2024-03-10T11:00:00Z',
    phone: '+55 11 94567-8901',
    department: 'RH'
  },
  {
    id: '7',
    name: 'Fernanda Souza',
    email: 'fernanda.souza@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda',
    levelId: '5',
    accountTypeId: '4',
    status: 'active',
    createdAt: '2024-03-01T08:30:00Z',
    lastLogin: '2024-03-26T07:45:00Z',
    phone: '+55 11 95678-9012',
    department: 'Suporte'
  },
  {
    id: '8',
    name: 'Bruno Ferreira',
    email: 'bruno.ferreira@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bruno',
    levelId: '5',
    accountTypeId: '4',
    status: 'suspended',
    createdAt: '2024-03-05T15:20:00Z',
    lastLogin: '2024-03-15T16:00:00Z',
    phone: '+55 11 96789-0123',
    department: 'Logística'
  },
  {
    id: '9',
    name: 'Camila Rodrigues',
    email: 'camila.rodrigues@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Camila',
    levelId: '5',
    accountTypeId: '5',
    status: 'active',
    createdAt: '2024-03-20T09:00:00Z',
    lastLogin: '2024-03-25T10:30:00Z',
    phone: '+55 11 97890-1234',
    department: 'Estagiário'
  },
  {
    id: '10',
    name: 'Diego Almeida',
    email: 'diego.almeida@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diego',
    levelId: '3',
    accountTypeId: '2',
    status: 'active',
    createdAt: '2024-03-10T11:15:00Z',
    lastLogin: '2024-03-26T09:00:00Z',
    phone: '+55 11 98901-2345',
    department: 'Produto'
  },
  {
    id: '11',
    name: 'Larissa Martins',
    email: 'larissa.martins@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Larissa',
    levelId: '4',
    accountTypeId: '3',
    status: 'active',
    createdAt: '2024-03-12T14:30:00Z',
    lastLogin: '2024-03-24T13:15:00Z',
    phone: '+55 11 99012-3456',
    department: 'Design'
  },
  {
    id: '12',
    name: 'Gabriel Pereira',
    email: 'gabriel.pereira@empresa.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel',
    levelId: '5',
    accountTypeId: '5',
    status: 'inactive',
    createdAt: '2024-03-15T10:45:00Z',
    phone: '+55 11 90123-4567',
    department: 'Estagiário'
  }
];

export const getDashboardStats = (): DashboardStats => {
  const activeUsers = users.filter(u => u.status === 'active').length;
  const inactiveUsers = users.filter(u => u.status === 'inactive').length;
  const suspendedUsers = users.filter(u => u.status === 'suspended').length;
  
  const usersByLevel: Record<string, number> = {};
  userLevels.forEach(level => {
    usersByLevel[level.name] = users.filter(u => u.levelId === level.id).length;
  });
  
  const usersByAccountType: Record<string, number> = {};
  accountTypes.forEach(type => {
    usersByAccountType[type.name] = users.filter(u => u.accountTypeId === type.id).length;
  });
  
  return {
    totalUsers: users.length,
    activeUsers,
    inactiveUsers,
    suspendedUsers,
    usersByLevel,
    usersByAccountType,
    recentUsers: users.slice(-5).reverse()
  };
};
