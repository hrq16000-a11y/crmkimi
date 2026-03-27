import { useState } from 'react';
import { Plus, Edit2, Trash2, CreditCard, Check, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AccountType } from '@/types';
import { toast } from 'sonner';

interface AccountTypesManagementProps {
  accountTypes: AccountType[];
  onAddAccountType: (type: Omit<AccountType, 'id'>) => void;
  onUpdateAccountType: (id: string, updates: Partial<AccountType>) => void;
  onDeleteAccountType: (id: string) => void;
}

const availableFeatures = [
  { id: 'API Access', label: 'Acesso à API' },
  { id: 'Priority Support', label: 'Suporte Prioritário' },
  { id: 'Custom Integrations', label: 'Integrações Customizadas' },
  { id: 'Unlimited Storage', label: 'Armazenamento Ilimitado' },
  { id: 'Advanced Analytics', label: 'Analytics Avançado' },
  { id: 'SSO', label: 'SSO (Single Sign-On)' },
  { id: 'Custom Reports', label: 'Relatórios Customizados' },
  { id: '100GB Storage', label: '100GB Armazenamento' },
  { id: '50GB Storage', label: '50GB Armazenamento' },
  { id: '10GB Storage', label: '10GB Armazenamento' },
  { id: '5GB Storage', label: '5GB Armazenamento' },
  { id: 'Team Collaboration', label: 'Colaboração em Equipe' },
  { id: 'Email Support', label: 'Suporte por Email' },
  { id: 'Community Support', label: 'Suporte da Comunidade' },
  { id: 'Basic Features', label: 'Recursos Básicos' },
  { id: 'Limited Access', label: 'Acesso Limitado' },
  { id: '14 Days Trial', label: 'Teste de 14 Dias' },
];

const colorOptions = [
  { value: '#8b5cf6', label: 'Violeta' },
  { value: '#ec4899', label: 'Rosa' },
  { value: '#06b6d4', label: 'Ciano' },
  { value: '#64748b', label: 'Cinza' },
  { value: '#84cc16', label: 'Lima' },
  { value: '#ef4444', label: 'Vermelho' },
  { value: '#f97316', label: 'Laranja' },
  { value: '#eab308', label: 'Amarelo' },
  { value: '#22c55e', label: 'Verde' },
  { value: '#3b82f6', label: 'Azul' },
];

export function AccountTypesManagement({
  accountTypes,
  onAddAccountType,
  onUpdateAccountType,
  onDeleteAccountType
}: AccountTypesManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#8b5cf6',
    features: [] as string[],
    maxUsers: 10,
    price: 0
  });

  const handleAdd = () => {
    if (!formData.name || !formData.description) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }
    onAddAccountType(formData);
    toast.success('Tipo de conta adicionado com sucesso!');
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (selectedType) {
      onUpdateAccountType(selectedType.id, formData);
      toast.success('Tipo de conta atualizado com sucesso!');
      setIsEditDialogOpen(false);
      setSelectedType(null);
    }
  };

  const handleDelete = () => {
    if (selectedType) {
      try {
        onDeleteAccountType(selectedType.id);
        toast.success('Tipo de conta excluído com sucesso!');
        setIsDeleteDialogOpen(false);
        setSelectedType(null);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Erro ao excluir tipo de conta');
      }
    }
  };

  const toggleFeature = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const openEditDialog = (type: AccountType) => {
    setSelectedType(type);
    setFormData({
      name: type.name,
      description: type.description,
      color: type.color,
      features: type.features,
      maxUsers: type.maxUsers || 10,
      price: type.price || 0
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (type: AccountType) => {
    setSelectedType(type);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      color: '#8b5cf6',
      features: [],
      maxUsers: 10,
      price: 0
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const renderTypeForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Plano *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Ex: Enterprise"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descreva os benefícios deste plano"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="color">Cor</Label>
          <Select 
            value={formData.color} 
            onValueChange={(value) => setFormData({ ...formData, color: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma cor" />
            </SelectTrigger>
            <SelectContent>
              {colorOptions.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color.value }}
                    />
                    {color.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxUsers">Máx. Usuários</Label>
          <Input
            id="maxUsers"
            type="number"
            min={1}
            value={formData.maxUsers}
            onChange={(e) => setFormData({ ...formData, maxUsers: parseInt(e.target.value) || 1 })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            type="number"
            min={0}
            step={0.01}
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Recursos Incluídos</Label>
        <div className="grid grid-cols-2 gap-2 border rounded-lg p-3 max-h-48 overflow-y-auto">
          {availableFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => toggleFeature(feature.id)}
              className={`flex items-center gap-2 p-2 rounded-md text-left text-sm transition-colors ${
                formData.features.includes(feature.id)
                  ? 'bg-violet-50 text-violet-700 border border-violet-200'
                  : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <div className={`w-4 h-4 rounded flex items-center justify-center ${
                formData.features.includes(feature.id)
                  ? 'bg-violet-500 text-white'
                  : 'border border-slate-300'
              }`}>
                {formData.features.includes(feature.id) && <Check size={12} />}
              </div>
              {feature.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Tipos de Conta</h3>
          <p className="text-sm text-slate-500">Gerencie os planos e recursos disponíveis</p>
        </div>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
        >
          <Plus size={18} className="mr-2" />
          Novo Tipo
        </Button>
      </div>

      {/* Account Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accountTypes.map((type) => (
          <Card key={type.id} className="hover:shadow-md transition-shadow overflow-hidden">
            <div 
              className="h-2"
              style={{ backgroundColor: type.color }}
            />
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${type.color}20` }}
                  >
                    <CreditCard size={24} style={{ color: type.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{type.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: type.color }}
                      />
                      <span className="text-xs text-slate-500">
                        {type.features.length} recursos
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openEditDialog(type)}
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openDeleteDialog(type)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                {type.description}
              </p>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Users size={16} className="text-slate-400" />
                  <span>Até {type.maxUsers} usuários</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-600">
                  <DollarSign size={16} className="text-slate-400" />
                  <span>{formatPrice(type.price || 0)}/mês</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 mb-2">Recursos principais:</p>
                <div className="flex flex-wrap gap-1">
                  {type.features.slice(0, 4).map((feature) => (
                    <Badge 
                      key={feature} 
                      variant="secondary" 
                      className="text-xs"
                      style={{ 
                        backgroundColor: `${type.color}15`,
                        color: type.color,
                        borderColor: `${type.color}30`
                      }}
                    >
                      {feature}
                    </Badge>
                  ))}
                  {type.features.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{type.features.length - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Tipo de Conta</DialogTitle>
            <DialogDescription>
              Crie um novo plano com recursos e limitações específicas.
            </DialogDescription>
          </DialogHeader>
          {renderTypeForm()}
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
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Tipo de Conta</DialogTitle>
            <DialogDescription>
              Atualize as informações do plano.
            </DialogDescription>
          </DialogHeader>
          {renderTypeForm()}
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
              Tem certeza que deseja excluir o tipo de conta <strong>{selectedType?.name}</strong>?
              <br /><br />
              <span className="text-amber-600 text-sm">
                Nota: Tipos de conta em uso por usuários não podem ser excluídos.
              </span>
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
