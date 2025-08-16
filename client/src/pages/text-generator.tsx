import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import TextGeneratorForm from "@/components/text-generator-form";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, PenTool, Zap, Target } from "lucide-react";

export default function TextGenerator() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-neutral" data-testid="text-generator-hero">
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
              Генератор коммерческих текстов
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="page-description">
              Создавайте продающие тексты с помощью искусственного интеллекта. 
              Укажите тему, аудиторию и получите готовый коммерческий контент.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-12" data-testid="demo-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TextGeneratorForm />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="features-title">
              Возможности ИИ-копирайтера
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="features-description">
              Создавайте качественный контент для любых маркетинговых задач
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm" data-testid="feature-1">
              <PenTool className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Профессиональные тексты</h3>
              <p className="text-gray-600">
                Создание продающих текстов, соответствующих современным стандартам
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm" data-testid="feature-2">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Быстрая генерация</h3>
              <p className="text-gray-600">
                Получайте готовые тексты за секунды вместо часов работы копирайтера
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm" data-testid="feature-3">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Точное попадание</h3>
              <p className="text-gray-600">
                Тексты адаптированы под вашу целевую аудиторию и задачи
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-white" data-testid="use-cases-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="use-cases-title">
              Типы текстов, которые мы создаем
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border rounded-lg" data-testid="use-case-1">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-semibold mb-2">Посты для соцсетей</h3>
              <p className="text-sm text-gray-600">Instagram, ВКонтакте, Telegram</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg" data-testid="use-case-2">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-semibold mb-2">Email-рассылки</h3>
              <p className="text-sm text-gray-600">Письма для клиентов и партнеров</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg" data-testid="use-case-3">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="font-semibold mb-2">Тексты для сайтов</h3>
              <p className="text-sm text-gray-600">Главные страницы, описания услуг</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg" data-testid="use-case-4">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold mb-2">Коммерческие предложения</h3>
              <p className="text-sm text-gray-600">КП для b2b сегмента</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg" data-testid="use-case-5">
              <div className="text-4xl mb-4">📰</div>
              <h3 className="font-semibold mb-2">Статьи и обзоры</h3>
              <p className="text-sm text-gray-600">Экспертный контент для блогов</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg" data-testid="use-case-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold mb-2">Рекламные объявления</h3>
              <p className="text-sm text-gray-600">Яндекс.Директ, Google Ads</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg" data-testid="use-case-7">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="font-semibold mb-2">Описания товаров</h3>
              <p className="text-sm text-gray-600">Карточки для интернет-магазинов</p>
            </div>
            
            <div className="text-center p-6 border rounded-lg" data-testid="use-case-8">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-semibold mb-2">Бизнес-планы</h3>
              <p className="text-sm text-gray-600">Презентации и стратегии</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">
            Нужны качественные тексты для бизнеса?
          </h2>
          <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
            Доверьте создание контента профессиональным копирайтерам Smart 360
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild data-testid="cta-contact">
              <Link href="/contact">
                Заказать тексты
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
                href="https://wa.me/79409435555?text=Здравствуйте,%20хочу%20узнать%20о%20создании%20текстов%20Smart%20360"
                target="_blank"
                rel="noopener noreferrer"
              >
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
