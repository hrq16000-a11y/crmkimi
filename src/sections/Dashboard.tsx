import { Users, UserCheck, UserX, UserCog, TrendingUp, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { User, UserLevel, AccountType } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardProps {
  users: User[];
  levels: UserLevel[];
  accountTypes: AccountType[];
}

export function Dashboard({ users, levels, accountTypes }: DashboardProps) {
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length
  };

  const levelData = levels.map(level => ({
    name: level.name,
    count: users.filter(u => u.levelId === level.id).length,
    color: level.color
  })).filter(d => d.count > 0);

  const accountTypeData = accountTypes.map(type => ({
    name: type.name,
    count: users.filter(u => u.accountTypeId === type.id).length,
    color: type.color
  })).filter(d => d.count > 0);

  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Ativo</Badge>;
      case 'inactive':
        return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">Inativo</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Suspenso</Badge>;
      default:
        return null;
    }
  };

  const getLevelName = (levelId: string) => {
    return levels.find(l => l.id === levelId)?.name || 'N/A';
  };

  const getAccountTypeName = (typeId: string) => {
    return accountTypes.find(t => t.id === typeId)?.name || 'N/A';
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <Users size={16} />
              Total de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-800">{stats.total}</span>
              <span className="text-xs text-emerald-600 flex items-center gap-1">
                <TrendingUp size={12} />
                +12%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <UserCheck size={16} />
              Usuários Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-800">{stats.active}</span>
              <span className="text-xs text-slate-500">
                {((stats.active / stats.total) * 100).toFixed(0)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-slate-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <UserX size={16} />
              Inativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-800">{stats.inactive}</span>
              <span className="text-xs text-slate-500">
                {((stats.inactive / stats.total) * 100).toFixed(0)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 flex items-center gap-2">
              <UserCog size={16} />
              Suspensos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold text-slate-800">{stats.suspended}</span>
              <span className="text-xs text-slate-500">
                {((stats.suspended / stats.total) * 100).toFixed(0)}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity size={18} className="text-blue-500" />
              Usuários por Nível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={levelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {levelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity size={18} className="text-purple-500" />
              Usuários por Tipo de Conta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accountTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {accountTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {accountTypeData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-slate-600">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Usuários Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Usuário</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Nível</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Tipo de Conta</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full bg-slate-100"
                        />
                        <div>
                          <p className="font-medium text-slate-800">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-700">{getLevelName(user.levelId)}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-slate-700">{getAccountTypeName(user.accountTypeId)}</span>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
