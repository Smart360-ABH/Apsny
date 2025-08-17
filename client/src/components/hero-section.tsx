import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero-gradient text-white py-20" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Умные решения для вашего бизнеса
            </h1>
            <p className="text-xl mb-8 text-blue-100" data-testid="hero-description">
// [removed chatbot-related line]
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="hero-consultation-button"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Получить консультацию
              </Button>
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90"
                asChild
// [removed chatbot-related line]
              >
                <a 
                  href="https://wa.me/79409435555?text=Здравствуйте,%20хочу%20узнать%20о%20решениях%20Smart%20360%20для%20моего%20бизнеса."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
// [removed chatbot-related line]
                </a>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
// [removed chatbot-related line]
              className="rounded-xl shadow-2xl w-full h-auto"
              data-testid="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}