import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ChatbotInterface from "@/components/chatbot-interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MessageCircle, ArrowLeft, Zap, Clock, BarChart } from "lucide-react";

export default function ChatbotDemo() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-neutral" data-testid="chatbot-demo-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild data-testid="back-button">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Link>
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="page-title">
              Демонстрация чат-бота Smart 360
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="page-description">
              Попробуйте наш ИИ-помощник в действии. Задавайте вопросы о наших услугах и получайте мгновенные ответы.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-12" data-testid="demo-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChatbotInterface />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-neutral" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="features-title">
              Возможности наших чат-ботов
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="features-description">
              Автоматизируйте обслуживание клиентов с помощью умных ассистентов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6" data-testid="feature-1">
              <CardContent className="pt-6">
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Быстрые ответы</h3>
                <p className="text-gray-600">
                  Мгновенные ответы на часто задаваемые вопросы 24/7
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6" data-testid="feature-2">
              <CardContent className="pt-6">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Естественное общение</h3>
                <p className="text-gray-600">
                  ИИ понимает контекст и ведет диалог как живой консультант
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6" data-testid="feature-3">
              <CardContent className="pt-6">
                <BarChart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Аналитика</h3>
                <p className="text-gray-600">
                  Подробная статистика обращений и эффективности
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="py-16 bg-white" data-testid="integration-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="integration-title">
              Где можно использовать
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg border" data-testid="use-case-1">
              <div className="text-4xl mb-4">🛍️</div>
              <h3 className="font-semibold mb-2">Интернет-магазины</h3>
              <p className="text-sm text-gray-600">Помощь в выборе товаров и оформлении заказов</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border" data-testid="use-case-2">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-semibold mb-2">Медицинские центры</h3>
              <p className="text-sm text-gray-600">Запись на прием и консультации</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border" data-testid="use-case-3">
              <div className="text-4xl mb-4">🏨</div>
              <h3 className="font-semibold mb-2">Гостиницы</h3>
              <p className="text-sm text-gray-600">Бронирование номеров и сервисы</p>
            </div>
            
            <div className="text-center p-6 rounded-lg border" data-testid="use-case-4">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="font-semibold mb-2">Образование</h3>
              <p className="text-sm text-gray-600">Поддержка студентов и абитуриентов</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">
            Внедрите чат-бота в свой бизнес
          </h2>
          <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
            Увеличьте конверсию на 30-50% с помощью умного ассистента
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild data-testid="cta-contact">
              <Link href="/contact">
                Заказать чат-бота
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              asChild
              data-testid="cta-whatsapp"
            >
              <a 
                href="https://wa.me/79409435555?text=Здравствуйте,%20хочу%20узнать%20о%20чат-ботах%20Smart%20360"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp консультация
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
