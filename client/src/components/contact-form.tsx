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
import { Send, User, Phone, Mail } from "lucide-react";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Заявка отправлена!",
        description: "Спасибо за обращение! Мы свяжемся с вами в течение часа.",
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте снова.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.service) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля: имя, телефон и услугу",
        variant: "destructive"
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card data-testid="contact-form-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2" data-testid="contact-form-title">
          <Send className="w-6 h-6 text-primary" />
          Отправить заявку
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
          <div>
            <Label htmlFor="name">Имя *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ваше имя"
                className="pl-10"
                required
                data-testid="name-input"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Телефон *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="pl-10"
                required
                data-testid="phone-input"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                className="pl-10"
                data-testid="email-input"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="service">Услуга *</Label>
            <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
              <SelectTrigger data-testid="service-select">
                <SelectValue placeholder="Выберите услугу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Создание сайта">Создание сайта</SelectItem>
// [removed chatbot-related line]
                <SelectItem value="Яндекс.Карты">Яндекс.Карты</SelectItem>
                <SelectItem value="Виртуальный тур">Виртуальный тур</SelectItem>
                <SelectItem value="Реклама в Instagram">Реклама в Instagram</SelectItem>
                <SelectItem value="Тексты и бизнес-план">Тексты и бизнес-план</SelectItem>
                <SelectItem value="Комплексное решение">Комплексное решение</SelectItem>
                <SelectItem value="Консультация">Консультация</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Сообщение</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Расскажите о вашем проекте..."
              rows={4}
              data-testid="message-input"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={submitMutation.isPending}
            data-testid="submit-button"
          >
            <Send className="w-4 h-4 mr-2" />
            {submitMutation.isPending ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-green-50 rounded-lg" data-testid="form-info">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-sm">✓</span>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-1">Что происходит после отправки?</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Мы получаем вашу заявку моментально</li>
                <li>• Связываемся с вами в течение часа</li>
                <li>• Обсуждаем детали проекта</li>
                <li>• Предлагаем оптимальное решение</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}