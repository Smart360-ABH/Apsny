import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Download, Map } from "lucide-react";

interface YandexMapsData {
  organizationName: string;
  address: string;
  phone: string;
  workingHours: string;
  category: string;
  description: string;
}

export default function YandexMapsForm() {
  const [formData, setFormData] = useState<YandexMapsData>({
    organizationName: "Smart 360",
    address: "г. Сухум, ул. Эшба 166",
    phone: "+7 940 943-55-55",
    workingHours: "Пн-Пт: 9:00-18:00",
// [removed chatbot-related line]
    description: ""
  });

  const { toast } = useToast();

  const createEntryMutation = useMutation({
    mutationFn: async (data: YandexMapsData) => {
      const jsonData = {
        organization: {
          name: data.organizationName,
          address: data.address,
          phone: data.phone,
          workingHours: data.workingHours,
          category: data.category,
          description: data.description
        },
        coordinates: {
          latitude: 42.9849,  // Примерные координаты Сухума
          longitude: 41.0201
        },
        features: [
// [removed chatbot-related line]
          "ИИ-решения для бизнеса",
          "Виртуальные туры 360°",
          "Интеграция с картами"
        ],
        contacts: {
          website: "https://smart360.ru",
          email: "Service-abh@yandex.ru",
// [removed chatbot-related line]
        },
        yandexMapsConfig: {
          rubric: "Веб-студия",
          verified: false,
          photos: [],
          reviews: {
            enabled: true,
            moderationEnabled: true
          }
        }
      };

      const response = await apiRequest("POST", "/api/yandex-maps", {
        ...data,
        jsonData: JSON.stringify(jsonData, null, 2)
      });
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Успешно!",
        description: "Карточка организации создана. Теперь можно экспортировать JSON.",
      });
      
// [removed chatbot-related line]
      const blob = new Blob([data.jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${formData.organizationName.replace(/\s+/g, '-')}-yandex-maps.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать карточку организации",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEntryMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof YandexMapsData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="demo-interface" data-testid="yandex-maps-form">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="form-title">
          <Map className="w-6 h-6 text-primary" />
          Заполнение карточки Яндекс.Карты
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="maps-form">
              <div>
                <Label htmlFor="organizationName">Название организации *</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  placeholder="Smart 360"
                  required
                  data-testid="organization-name-input"
                />
              </div>

              <div>
                <Label htmlFor="address">Адрес *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="г. Сухум, ул. Эшба 166"
                  required
                  data-testid="address-input"
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+7 940 943-55-55"
                  required
                  data-testid="phone-input"
                />
              </div>

              <div>
// [removed chatbot-related line]
                <Input
                  id="workingHours"
                  value={formData.workingHours}
                  onChange={(e) => handleInputChange('workingHours', e.target.value)}
                  placeholder="Пн-Пт: 9:00-18:00"
                  data-testid="working-hours-input"
                />
              </div>

              <div>
                <Label htmlFor="category">Категория *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger data-testid="category-select">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
// [removed chatbot-related line]
                    <SelectItem value="IT-услуги">IT-услуги</SelectItem>
                    <SelectItem value="Маркетинговое агентство">Маркетинговое агентство</SelectItem>
                    <SelectItem value="Консалтинг">Консалтинг</SelectItem>
                    <SelectItem value="Дизайн-студия">Дизайн-студия</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Описание деятельности</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Краткое описание вашей деятельности..."
                  rows={3}
                  data-testid="description-input"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={createEntryMutation.isPending}
                data-testid="create-entry-button"
              >
                <Download className="w-4 h-4 mr-2" />
                {createEntryMutation.isPending ? "Создание..." : "Создать и экспортировать JSON"}
              </Button>
            </form>
          </div>

          <div>
            <Label>Предварительный просмотр</Label>
            <div className="bg-gray-100 rounded-lg p-4 h-80 mt-2" data-testid="map-preview">
              <img 
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=320" 
                alt="Предварительный просмотр расположения на карте" 
                className="w-full h-full object-cover rounded"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2" data-testid="preview-caption">
              Предварительный просмотр местоположения: {formData.address}
            </p>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg" data-testid="integration-info">
              <h4 className="font-semibold text-sm mb-2">Что входит в интеграцию:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Точная привязка к координатам</li>
                <li>✓ Полная контактная информация</li>
// [removed chatbot-related line]
                <li>✓ Категория деятельности</li>
                <li>✓ Настройка отзывов</li>
                <li>✓ SEO-оптимизация карточки</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}