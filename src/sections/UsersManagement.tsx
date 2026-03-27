import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Power, Filter, MoreHorizontal, Mail, Phone, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { User, UserLevel, AccountType, UserStatus } from '@/types';
import { toast } from 'sonner';

interface UsersManagementProps {
  users: User[];
  levels: UserLevel[];
  accountTypes: AccountType[];
  onAddUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  onUpdateUser: (id: string, updates: Partial<User>) => void;
  onDeleteUser: (id: string) => void;
  onToggleStatus: (id: string) => void;
  getLevelById: (id: string) => UserLevel | undefined;
  getAccountTypeById: (id: string) => AccountType | undefined;
}

export function UsersManagement({
  users,
  levels,
  accountTypes,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onToggleStatus,
  getLevelById,
  getAccountTypeById
}: UsersManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    levelId: '',
    accountTypeId: '',
    status: 'active' as UserStatus
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesLevel = levelFilter === 'all' || user.levelId === levelFilter;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const handleAdd = () => {
    if (!formData.name || !formData.email || !formData.levelId || !formData.accountTypeId) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    onAddUser({
      ...formData,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
    });
    toast.success('Usuário adicionado com sucesso!');
    setIsAddDialogOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      levelId: '',
      accountTypeId: '',
      status: 'active' as UserStatus
    });
  };

  const handleEdit = () => {
    if (selectedUser) {
      onUpdateUser(selectedUser.id, formData);
      toast.success('Usuário atualizado com sucesso!');
      setIsEditDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDelete = () => {
    if (selectedUser) {
      onDeleteUser(selectedUser.id);
      toast.success('Usuário excluído com sucesso!');
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleToggleStatus = (user: User) => {
    onToggleStatus(user.id);
    const newStatus = user.status === 'active' ? 'inativo' : user.status === 'inactive' ? ' suspenso' : 'ativo';
    toast.success(`Status alterado para ${newStatus}`);
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      department: user.department || '',
      levelId: user.levelId,
      accountTypeId: user.accountTypeId,
      status: user.status
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

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

  const renderUserForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nome completo"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="email@empresa.com"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+55 11 98765-4321"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Departamento</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            placeholder="Ex: Vendas"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="level">Nível *</Label>
          <Select 
            value={formData.levelId} 
            onValueChange={(value) => setFormData({ ...formData, levelId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o nível" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level.id} value={level.id}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: level.color }}
                    />
                    {level.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="accountType">Tipo de Conta *</Label>
          <Select 
            value={formData.accountTypeId} 
            onValueChange={(value) => setFormData({ ...formData, accountTypeId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              {accountTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: type.color }}
                    />
                    {type.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input
              placeholder="Buscar usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
              <SelectItem value="suspended">Suspenso</SelectItem>
            </SelectContent>
          </Select>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os níveis</SelectItem>
              {levels.map((level) => (
                <SelectItem key={level.id} value={level.id}>{level.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <Plus size={18} className="mr-2" />
          Novo Usuário
        </Button>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => {
          const level = getLevelById(user.levelId);
          const accountType = getAccountTypeById(user.accountTypeId);
          
          return (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-14 h-14 rounded-full bg-slate-100"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-800">{user.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Mail size={12} />
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(user)}>
                        <Edit2 size={14} className="mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(user)}>
                        <Power size={14} className="mr-2" />
                        Alterar Status
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => openDeleteDialog(user)}
                        className="text-red-600"
                      >
                        <Trash2 size={14} className="mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Nível:</span>
                    <div className="flex items-center gap-1.5">
                      <div 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: level?.color }}
                      />
                      <span className="text-sm font-medium">{level?.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Tipo:</span>
                    <div className="flex items-center gap-1.5">
                      <div 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: accountType?.color }}
                      />
                      <span className="text-sm font-medium">{accountType?.name}</span>
                    </div>
                  </div>
                  {user.department && (
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Building size={14} />
                      {user.department}
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center gap-1 text-sm text-slate-500">
                      <Phone size={14} />
                      {user.phone}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  {getStatusBadge(user.status)}
                  <span className="text-xs text-slate-400">
                    Cadastro: {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo usuário. Campos com * são obrigatórios.
            </DialogDescription>
          </DialogHeader>
          {renderUserForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAdd}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Atualize os dados do usuário.
            </DialogDescription>
          </DialogHeader>
          {renderUserForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEdit}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o usuário <strong>{selectedUser?.name}</strong>?
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
