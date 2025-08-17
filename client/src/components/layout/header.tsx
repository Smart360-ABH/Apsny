import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Главная" },
    { href: "/services", label: "Услуги" },
    { href: "/portfolio", label: "Портфолио" },
    { href: "/pricing", label: "Цены" },
    { href: "/contact", label: "Контакты" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" data-testid="header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" data-testid="logo-link">
              <div className="text-2xl font-bold text-primary">Smart 360</div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" data-testid="desktop-nav">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`transition-colors ${
                  location === item.href 
                    ? "text-primary font-medium" 
                    : "text-gray-600 hover:text-primary"
                }`}
                data-testid={`nav-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact & Actions */}
          <div className="flex items-center space-x-4">
            <a 
              href="tel:+79409435555" 
              className="hidden sm:inline-flex text-sm font-medium text-primary items-center gap-2"
              data-testid="header-phone"
            >
              <Phone className="w-4 h-4" />
              +7 940 943-55-55
            </a>
            <a 
              href="https://wa.me/79409435555?text=Здравствуйте,%20хочу%20узнать%20о%20решениях%20Smart%20360%20для%20моего%20бизнеса."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium inline-flex items-center gap-2"
// [removed chatbot-related line]
            >
              <MessageCircle className="w-4 h-4" />
// [removed chatbot-related line]
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t" data-testid="mobile-nav">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block transition-colors ${
                    location === item.href 
                      ? "text-primary font-medium" 
                      : "text-gray-600 hover:text-primary"
                  }`}
                  data-testid={`mobile-nav-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}