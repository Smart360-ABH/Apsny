import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import VirtualTourViewer from "@/components/virtual-tour-viewer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Eye, Upload, Download } from "lucide-react";

export default function VirtualTour() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-neutral" data-testid="virtual-tour-hero">
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
              Виртуальные туры 360°
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="page-description">
              Создавайте и просматривайте виртуальные туры вашего заведения. 
              Загружайте 360° фотографии и экспортируйте готовые пакеты для Яндекс.Карт.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-12" data-testid="demo-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <VirtualTourViewer />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-neutral" data-testid="benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="benefits-title">
              Преимущества виртуальных туров
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-testid="benefits-description">
              Покажите ваше заведение в лучшем свете и привлеките больше клиентов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm" data-testid="benefit-1">
              <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Реалистичный просмотр</h3>
              <p className="text-gray-600">
                Клиенты могут "прогуляться" по вашему заведению не выходя из дома
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm" data-testid="benefit-2">
              <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Простая загрузка</h3>
              <p className="text-gray-600">
                Загружайте панорамные фотографии и создавайте туры за минуты
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm" data-testid="benefit-3">
              <Download className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Интеграция с картами</h3>
              <p className="text-gray-600">
                Экспортируйте готовые пакеты для размещения в Яндекс.Картах
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
              Для каких объектов подходит
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4" data-testid="use-case-1">
              <div className="text-4xl mb-3">🏨</div>
              <h3 className="font-semibold text-sm">Отели и гостиницы</h3>
            </div>
            
            <div className="text-center p-4" data-testid="use-case-2">
              <div className="text-4xl mb-3">🍽️</div>
              <h3 className="font-semibold text-sm">Рестораны и кафе</h3>
            </div>
            
            <div className="text-center p-4" data-testid="use-case-3">
              <div className="text-4xl mb-3">🛍️</div>
              <h3 className="font-semibold text-sm">Магазины и салоны</h3>
            </div>
            
            <div className="text-center p-4" data-testid="use-case-4">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="font-semibold text-sm">Офисы и центры</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" data-testid="cta-title">
            Создайте виртуальный тур для вашего бизнеса
          </h2>
          <p className="text-xl text-blue-100 mb-8" data-testid="cta-description">
            Профессиональная 360° съемка и размещение в Яндекс.Картах
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild data-testid="cta-contact">
              <Link href="/contact">
                Заказать съемку
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
                href="https://wa.me/79409435555?text=Здравствуйте,%20хочу%20узнать%20о%20виртуальных%20турах%20Smart%20360"
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
