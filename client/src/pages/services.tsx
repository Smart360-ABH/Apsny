import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ServiceCard from "@/components/service-card";

export default function Services() {
  const services = [
    {
      title: "Создание сайтов",
      description: "Персональные и корпоративные сайты с современным дизайном и SEO-оптимизацией. Адаптивная верстка, быстрая загрузка, удобная CMS.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
// [removed chatbot-related line]
// [removed chatbot-related line]
      phoneNumber: "+7 940 766-66-44"
    },
    {
// [removed chatbot-related line]
      description: "Умные помощники для автоматизации общения с клиентами и внутренних процессов. Поддержка 24/7, интеграция с CRM.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
// [removed chatbot-related line]
// [removed chatbot-related line]
      phoneNumber: "+7 940 943-55-55"
    },
    {
      title: "Яндекс.Карты",
      description: "Полное заполнение профиля организации, каталоги товаров и услуг в картах. Привлечение местных клиентов через геопоиск.",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      imageAlt: "Интеграция бизнеса в Яндекс.Карты",
// [removed chatbot-related line]
      phoneNumber: "+7 940 766-66-44"
    },
    {
      title: "Виртуальные туры",
// [removed chatbot-related line]
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      imageAlt: "360-градусные виртуальные туры для бизнеса",
// [removed chatbot-related line]
      phoneNumber: "+7 940 943-55-55"
    },
    {
      title: "Реклама в Instagram",
      description: "Создание эффективных рекламных кампаний и креативов для социальных сетей. Таргетинг, A/B тестирование, аналитика.",
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      imageAlt: "Креативная реклама в Instagram",
// [removed chatbot-related line]
      phoneNumber: "+7 940 766-66-44"
    },
    {
      title: "Тексты и Бизнес-планы",
// [removed chatbot-related line]
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      imageAlt: "Создание текстов и бизнес-планов",
// [removed chatbot-related line]
      phoneNumber: "+7 940 943-55-55"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20" data-testid="services-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="services-title">
            Наши услуги
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto" data-testid="services-description">
            Полный спектр цифровых решений для развития вашего бизнеса. 
            От создания сайтов до внедрения ИИ-технологий.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-neutral" data-testid="services-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 bg-white" data-testid="services-info">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6" data-testid="process-title">
// [removed chatbot-related line]
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center" data-testid="step-1">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Консультация</h3>
              <p className="text-sm text-gray-600">Анализируем ваш бизнес и потребности</p>
            </div>
            
            <div className="text-center" data-testid="step-2">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Планирование</h3>
              <p className="text-sm text-gray-600">Разрабатываем техническое задание</p>
            </div>
            
            <div className="text-center" data-testid="step-3">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Реализация</h3>
              <p className="text-sm text-gray-600">Создаем решение согласно плану</p>
            </div>
            
            <div className="text-center" data-testid="step-4">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Поддержка</h3>
              <p className="text-sm text-gray-600">Обеспечиваем техническое сопровождение</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}