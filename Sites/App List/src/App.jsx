import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Mail, Phone, MapPin, Star, ArrowLeft, ArrowRight, Image, CheckSquare, Zap, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function TaskOrganizerLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' for English, 'pt' for Portuguese

  // Translations
  const translations = {
    en: {
      nav: {
        home: "Home",
        features: "Features",
        about: "About",
        more: "More Info",
        support: "Support",
        docs: "Documentation",
        signup: "Sign Up",
        login: "Login"
      },
      hero: {
        title: ["ORGANIZE", "YOUR TASKS", "EFFORTLESS", "LY"],
        subtitle: "Stay on top of your to-do list with our intuitive and user-friendly app designed for modern productivity.",
        cta1: "Get Started",
        cta2: "Learn More"
      },
      features1: {
        title: ["EFFORTLESSLY", "MANAGE YOUR", "TASKS WITH OUR", "INTUITIVE APP"],
        subtitle: "Stay organized and boost your productivity with our user-friendly interface. Add, complete, and delete tasks seamlessly.",
        stat1: "100%",
        stat1Text: "Your tasks, organized and simplified for your convenience.",
        stat2: "EASY",
        stat2Text: "Start your journey to better task management today."
      },
      features2: {
        title: ["POWERFUL", "FEATURES FOR", "MODERN", "PRODUCTIVITY"],
        subtitle: "Experience seamless task management with advanced features designed for both individual users and teams.",
        feature1: {
          title: "TASK MANAGEMENT",
          description: "Easily track your progress and never miss a deadline with smart reminders and priority settings."
        },
        feature2: {
          title: "USER FRIENDLY",
          description: "Designed for seamless navigation on both desktop and mobile devices with intuitive controls."
        }
      },
      testimonials: {
        title: "WHAT OUR USERS SAY",
        testimonials: [
          {
            quote: "THIS TO-DO LIST APP HAS TRANSFORMED HOW I MANAGE MY TASKS! IT'S INTUITIVE, SLEEK, AND KEEPS ME ORGANIZED EFFORTLESSLY.",
            name: "Alice Johnson",
            title: "Project Manager, TechCorp"
          },
          {
            quote: "INCREDIBLE PRODUCTIVITY BOOST! THE INTERFACE IS CLEAN AND THE FEATURES ARE EXACTLY WHAT I NEEDED.",
            name: "Mike Chen",
            title: "Software Developer, StartupXYZ"
          }
        ]
      },
      contact: {
        title: "CONTACT US",
        subtitle: "We'd love to hear from you and help you get started!",
        email: {
          title: "EMAIL",
          description: "Get in touch with our support team",
          linkText: "hello@taskflow.com"
        },
        phone: {
          title: "PHONE",
          description: "Call us anytime for immediate assistance",
          linkText: "+1 (555) 123-4567"
        },
        office: {
          title: "OFFICE",
          description: "123 Innovation Drive, San Francisco, CA 94105",
          linkText: "Get Directions"
        }
      },
      footer: {
        quickLinks: "Quick Links",
        followUs: "Follow Us",
        resources: "Resources",
        subscribe: "Subscribe",
        subscribeText: "Join our newsletter for updates on features and new releases.",
        subscribeButton: "Subscribe",
        privacyNote: "By subscribing, you agree to our Privacy Policy and consent to updates.",
        copyright: "© 2024 TaskFlow. All rights reserved.",
        links: ["Privacy Policy", "Terms of Service", "Cookie Settings"]
      }
    },
    pt: {
      nav: {
        home: "Início",
        features: "Recursos",
        about: "Sobre",
        more: "Mais Informações",
        support: "Suporte",
        docs: "Documentação",
        signup: "Cadastre-se",
        login: "Entrar"
      },
      hero: {
        title: ["ORGANIZE", "SUAS TAREFAS", "COM FACILIDADE", "E PRATICIDADE"],
        subtitle: "Mantenha-se em dia com sua lista de tarefas com nosso aplicativo intuitivo e fácil de usar, projetado para produtividade moderna.",
        cta1: "Começar Agora",
        cta2: "Saiba Mais"
      },
      features1: {
        title: ["GERENCIE SUAS", "TAREFAS COM", "FACILIDADE EM", "NOSSO APP"],
        subtitle: "Mantenha-se organizado e aumente sua produtividade com nossa interface amigável. Adicione, complete e exclua tarefas facilmente.",
        stat1: "100%",
        stat1Text: "Suas tarefas, organizadas e simplificadas para sua conveniência.",
        stat2: "FÁCIL",
        stat2Text: "Comece sua jornada para um melhor gerenciamento de tarefas hoje."
      },
      features2: {
        title: ["RECURSOS", "PODEROSOS PARA", "PRODUTIVIDADE", "MODERNA"],
        subtitle: "Experimente o gerenciamento perfeito de tarefas com recursos avançados projetados para usuários individuais e equipes.",
        feature1: {
          title: "GERENCIAMENTO",
          description: "Acompanhe seu progresso facilmente e nunca perca um prazo com lembretes inteligentes e configurações de prioridade."
        },
        feature2: {
          title: "FÁCIL USO",
          description: "Projetado para navegação perfeita em dispositivos desktop e móveis com controles intuitivos."
        }
      },
      testimonials: {
        title: "O QUE NOSSOS USUÁRIOS DIZEM",
        testimonials: [
          {
            quote: "ESTE APLICATIVO DE TAREFAS TRANSFORMOU COMO EU GERENCIO MINHAS ATIVIDADES! É INTUITIVO, ELEGANTE E ME MANTÉM ORGANIZADO SEM ESFORÇO.",
            name: "Ana Silva",
            title: "Gerente de Projetos, TechCorp"
          },
          {
            quote: "UM INCRÍVEL AUMENTO DE PRODUTIVIDADE! A INTERFACE É LIMPA E OS RECURSOS SÃO EXATAMENTE O QUE EU PRECISAVA.",
            name: "Carlos Oliveira",
            title: "Desenvolvedor, StartupXYZ"
          }
        ]
      },
      contact: {
        title: "CONTATO",
        subtitle: "Adoraríamos ouvir de você e ajudá-lo a começar!",
        email: {
          title: "EMAIL",
          description: "Entre em contato com nossa equipe de suporte",
          linkText: "ola@taskflow.com"
        },
        phone: {
          title: "TELEFONE",
          description: "Ligue para nós a qualquer momento para assistência imediata",
          linkText: "+55 (11) 98765-4321"
        },
        office: {
          title: "ESCRITÓRIO",
          description: "Av. Paulista, 1000, São Paulo, SP 01310-100",
          linkText: "Obter Direções"
        }
      },
      footer: {
        quickLinks: "Links Rápidos",
        followUs: "Siga-nos",
        resources: "Recursos",
        subscribe: "Assine",
        subscribeText: "Junte-se à nossa newsletter para atualizações sobre recursos e novos lançamentos.",
        subscribeButton: "Assinar",
        privacyNote: "Ao assinar, você concorda com nossa Política de Privacidade e consente com as atualizações.",
        copyright: "© 2024 TaskFlow. Todos os direitos reservados.",
        links: ["Política de Privacidade", "Termos de Serviço", "Configurações de Cookies"]
      }
    }
  };

  const t = translations[language];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set page title and favicon
  useEffect(() => {
    document.title = "TaskFlow";
    
    // Remove existing favicons
    const existingFavicons = document.querySelectorAll("link[rel*='icon']");
    existingFavicons.forEach(favicon => favicon.remove());

    // Create favicon with simpler and more compatible SVG
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    
    // SVG more simple and compatible with most browsers
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#facc15"/>
        <text x="16" y="22" text-anchor="middle" fill="black" font-size="18" font-weight="bold" font-family="Arial">T</text>
      </svg>
    `;
    
    favicon.href = 'data:image/svg+xml;base64,' + btoa(svgIcon);
    document.head.appendChild(favicon);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + t.testimonials.testimonials.length) % t.testimonials.testimonials.length);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="group hover:transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-yellow-400 mr-4" />
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-gray-300 font-medium group-hover:text-gray-200 transition-colors">
        {description}
      </p>
    </div>
  );

  const ContactCard = ({ icon: Icon, title, description, link, linkText }) => (
    <div className="flex items-start space-x-4 group hover:transform hover:translate-x-2 transition-all duration-300">
      <div className="flex-shrink-0 mt-2 p-2 bg-gray-800 rounded-full group-hover:bg-yellow-400 transition-colors">
        <Icon className="w-6 h-6 text-white group-hover:text-black" />
      </div>
      <div>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-gray-300 font-medium mb-2">{description}</p>
        <a href={link} className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium underline flex items-center group">
          {linkText}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Poppins',sans-serif]">
      {/* Enhanced Navigation - FIXED */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gray-900/80'
      }`}>
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          <div className="text-xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer">
            TaskFlow
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6 mr-10">
              <a href="#home" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">{t.nav.home}</a>
              <a href="#features" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">{t.nav.features}</a>
              <a href="#about" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">{t.nav.about}</a>
              <div className="relative group">
                <button className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center font-medium">
                  {t.nav.more}
                  <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="#support" className="block px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 first:rounded-t-lg">{t.nav.support}</a>
                  <a href="#docs" className="block px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 last:rounded-b-lg">{t.nav.docs}</a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleLanguage}
                className="px-3 py-1 text-sm text-gray-300 hover:text-yellow-400 border border-gray-600 rounded hover:border-yellow-400 transition-colors"
              >
                {language === 'en' ? 'PT' : 'EN'}
              </button>
              <button className="px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors font-medium">
                {t.nav.signup}
              </button>
              <button className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 hover:scale-105 transition-all duration-200">
                {t.nav.login}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 hover:bg-gray-800 rounded transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-6 py-4 space-y-4">
              <a href="#home" className="block text-gray-300 hover:text-yellow-400 transition-colors">{t.nav.home}</a>
              <a href="#features" className="block text-gray-300 hover:text-yellow-400 transition-colors">{t.nav.features}</a>
              <a href="#about" className="block text-gray-300 hover:text-yellow-400 transition-colors">{t.nav.about}</a>
              <a href="#contact" className="block text-gray-300 hover:text-yellow-400 transition-colors">{t.nav.more}</a>
              <button 
                onClick={toggleLanguage}
                className="block px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors text-left"
              >
                {language === 'en' ? 'Português' : 'English'}
              </button>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                <button className="px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors text-left">{t.nav.signup}</button>
                <button className="px-4 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition-colors">{t.nav.login}</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="px-6 md:px-12 py-20 md:py-32 mt-16">
        <div className="max-w-6xl">
          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8 tracking-tight uppercase animate-fade-in text-yellow-400">
            {t.hero.title[0]}<br />
            {t.hero.title[1]}<br />
            {t.hero.title[2]}<br />
            {t.hero.title[3]}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg font-medium animate-fade-in animation-delay-200">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in animation-delay-400">
            <button className="group px-8 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105 hover:shadow-xl">
              {t.hero.cta1}
              <ArrowRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3 border-2 border-gray-500 text-white hover:bg-gray-800 hover:border-yellow-400 transition-all duration-200 rounded font-medium">
              {t.hero.cta2}
            </button>
          </div>

          {/* Enhanced Hero Image */}
          <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl group animate-fade-in animation-delay-600">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Task management app interface"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-20 bg-gray-400/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckSquare className="w-12 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Feature Section 1 */}
      <section id="features" className="bg-gray-900 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tight uppercase text-white">
                {t.features1.title[0]}<br />
                {t.features1.title[1]}<br />
                {t.features1.title[2]}<br />
                {t.features1.title[3]}
              </h2>
              
              <p className="text-lg text-gray-300 mb-12 font-medium max-w-lg">
                {t.features1.subtitle}
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform">{t.features1.stat1}</div>
                  <p className="text-gray-300 font-medium">
                    {t.features1.stat1Text}
                  </p>
                </div>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform">{t.features1.stat2}</div>
                  <p className="text-gray-300 font-medium">
                    {t.features1.stat2Text}
                  </p>
                </div>
              </div>
            </div>

            <div className="order-first md:order-last animate-fade-in animation-delay-200">
              <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Task management interface"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-24 bg-gray-400/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckSquare className="w-16 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Feature Section 2 */}
      <section className="bg-gray-900 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tight uppercase text-white">
                {t.features2.title[0]}<br />
                {t.features2.title[1]}<br />
                {t.features2.title[2]}<br />
                {t.features2.title[3]}
              </h2>
              
              <p className="text-lg text-gray-300 mb-12 font-medium max-w-lg">
                {t.features2.subtitle}
              </p>

              <div className="space-y-8">
                <FeatureCard 
                  icon={CheckSquare}
                  title={t.features2.feature1.title}
                  description={t.features2.feature1.description}
                />
                <FeatureCard 
                  icon={Zap}
                  title={t.features2.feature2.title}
                  description={t.features2.feature2.description}
                />
              </div>
            </div>

            <div className="animate-fade-in animation-delay-200">
              <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80" 
                  alt="Productivity dashboard"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-24 bg-gray-400/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-16 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonial Section */}
      <section className="bg-gray-900 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center relative">
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 text-white hover:text-yellow-400 transition-all duration-200 hover:scale-110"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 text-white hover:text-yellow-400 transition-all duration-200 hover:scale-110"
          >
            <ArrowRight className="w-8 h-8" />
          </button>

          <div className="flex justify-center mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current hover:scale-110 transition-transform" />
            ))}
          </div>

          <div className="transition-all duration-500">
            <blockquote className="text-2xl md:text-4xl font-black leading-tight mb-12 tracking-tight uppercase text-white">
              "{t.testimonials.testimonials[currentTestimonial].quote}"
            </blockquote>

            <div className="flex items-center justify-center space-x-6 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">
                  {t.testimonials.testimonials[currentTestimonial].name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg">{t.testimonials.testimonials[currentTestimonial].name}</div>
                <div className="text-gray-300 font-medium">{t.testimonials.testimonials[currentTestimonial].title}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3">
            {t.testimonials.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial ? 'bg-yellow-400' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="bg-black px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <p className="text-yellow-400 font-medium text-lg mb-4">Connect</p>
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight uppercase text-white">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-300 mt-6 font-medium">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-12 animate-fade-in animation-delay-200">
              <ContactCard 
                icon={Mail}
                title={t.contact.email.title}
                description={t.contact.email.description}
                link={language === 'en' ? "mailto:hello@taskflow.com" : "mailto:ola@taskflow.com"}
                linkText={t.contact.email.linkText}
              />
              <ContactCard 
                icon={Phone}
                title={t.contact.phone.title}
                description={t.contact.phone.description}
                link={language === 'en' ? "tel:+15551234567" : "tel:+5511987654321"}
                linkText={t.contact.phone.linkText}
              />
              <ContactCard 
                icon={MapPin}
                title={t.contact.office.title}
                description={t.contact.office.description}
                link="#"
                linkText={t.contact.office.linkText}
              />
            </div>

            <div className="animate-fade-in animation-delay-400">
              <div className="relative w-full h-96 md:h-[500px] rounded-xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Office workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-24 bg-gray-400/80 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-16 h-12 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black px-6 md:px-12 py-16 md:py-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
            <div className="md:col-span-1">
              <div className="text-3xl font-bold text-white mb-4 hover:text-yellow-400 transition-colors cursor-pointer">
                TaskFlow
              </div>
            </div>

            {[
              {
                title: t.footer.quickLinks,
                links: ["Home Page", "App Features", "About Us", "Contact Us", "Support Center"]
              },
              {
                title: t.footer.followUs,
                links: ["Facebook Page", "Twitter Feed", "Instagram Profile", "LinkedIn Page", "YouTube Channel"]
              },
              {
                title: t.footer.resources,
                links: ["Documentation", "API Reference", "Community", "Blog", "Help Center"]
              }
            ].map((section, index) => (
              <div key={index} className="md:col-span-1">
                <h3 className="text-white font-bold text-lg mb-6">{section.title}</h3>
                <div className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <a key={linkIndex} href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div className="md:col-span-1">
              <h3 className="text-white font-bold text-lg mb-6">{t.footer.subscribe}</h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {t.footer.subscribeText}
              </p>
              <div className="flex flex-col gap-3 mb-4">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                />
                <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 hover:scale-105 transition-all duration-200">
                  {t.footer.subscribeButton}
                </button>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                {t.footer.privacyNote}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-6 md:mb-0">
              {t.footer.copyright}
              <div className="inline-block ml-8 space-x-6">
                {t.footer.links.map((link, index) => (
                  <a key={index} href="#" className="hover:text-yellow-400 transition-colors underline">{link}</a>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-yellow-400 hover:scale-110 transition-all duration-200">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}