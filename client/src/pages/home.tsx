import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/hero-section";
import ServiceCard from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Star, CheckCircle, Zap, Users, Award } from "lucide-react";

export default function Home() {
  const services = [
    {
      title: "Создание сайтов",
      description: "Персональные и корпоративные сайты с современным дизайном и SEO-оптимизацией",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      imageAlt: "Разработка современных веб-сайтов",
      whatsappUrl: "https://wa.me/79407666644?text=Здравствуйте,%20хочу%20узнать%20о%20решениях%20Smart%20360%20для%20моего%20бизнеса.",
      phoneNumber: "+7 940 766-66-44"
    },
    {
      title: "Чат-боты и Агенты ИИ",
      description: "Умные помощники для автоматизации общения с клиентами и внутренних процессов",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      imageAlt: "ИИ чат-бот для автоматизации бизнеса",
      whatsappUrl: "https://wa.me/79409435555?text=Здравствуйте,%20хочу%20узнать%20о%20решениях%20Smart%20360%20для%20моего%20бизнеса.",
      phoneNumber: "+7 940 943-55-55"
    },
    {
      title: "Яндекс.Карты",
      description: "Полное заполнение профиля организации, каталоги товаров и услуг в картах",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      imageAlt: "Интеграция бизнеса в Яндекс.Карты",
      whatsappUrl: "https://wa.me/79407666644?text=Здравствуйте,%20хочу%20узнать%20о%20решениях%20Smart%20360%20для%20моего%20бизнеса.",
      phoneNumber: "+7 940 766-66-44"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-12 h-12 text-primary" />,
      title: "Быстрое внедрение",
      description: "Запускаем проекты в кратчайшие сроки"
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Индивидуальный подход",
      description: "Каждое решение создается под ваши потребности"
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: "Гарантия качества",
      description: "Полная техническая поддержка и сопровождение"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-neutral" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="features-title">
              Почему выбирают Smart 360
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="features-description">
              Мы предоставляем комплексные цифровые решения для роста вашего бизнеса
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-8 card-hover" data-testid={`feature-card-${index}`}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center" data-testid={`feature-icon-${index}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4" data-testid={`feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600" data-testid={`feature-description-${index}`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white" data-testid="services-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="services-preview-title">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="services-preview-description">
              Полный спектр цифровых решений для развития вашего бизнеса
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild data-testid="view-all-services-button">
              <Link href="/services">
                <ArrowRight className="w-5 h-5 mr-2" />
                Все услуги
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-neutral" data-testid="demo-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="demo-title">
              Попробуйте наши решения
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="demo-description">
              Интерактивные демонстрации наших технологий
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/demo/chatbot" data-testid="demo-chatbot-link">
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Чат-бот</h3>
                  <p className="text-sm text-gray-600">Попробуйте ИИ-помощника</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/demo/virtual-tour" data-testid="demo-tour-link">
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Виртуальный тур</h3>
                  <p className="text-sm text-gray-600">360° просмотр</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/demo/yandex-maps" data-testid="demo-maps-link">
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🗺️</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Яндекс.Карты</h3>
                  <p className="text-sm text-gray-600">Создание карточки</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/demo/text-generator" data-testid="demo-text-link">
              <Card className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✍️</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Генератор текстов</h3>
                  <p className="text-sm text-gray-600">ИИ-копирайтер</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white" data-testid="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div data-testid="stat-projects">
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Проектов</div>
            </div>
            <div data-testid="stat-clients">
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Клиентов</div>
            </div>
            <div data-testid="stat-experience">
              <div className="text-4xl md:text-5xl font-bold mb-2">5+</div>
              <div className="text-blue-100">Лет опыта</div>
            </div>
            <div data-testid="stat-support">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-white" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" data-testid="cta-title">
            Готовы начать?
          </h2>
          <p className="text-xl text-gray-600 mb-8" data-testid="cta-description">
            Получите бесплатную консультацию по развитию вашего бизнеса
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild data-testid="cta-contact-button">
              <Link href="/contact">
                <ArrowRight className="w-5 h-5 mr-2" />
                Связаться с нами
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="cta-pricing-button">
              <Link href="/pricing">
                Посмотреть цены
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
