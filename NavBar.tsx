import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * custom,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const logoVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 }
  }
};

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Certificates", href: "#certificates" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine which section is currently in view
      const sections = navItems.map(item => item.href);
      const offsets = sections.map(section => {
        const element = document.querySelector(section);
        return element ? element.getBoundingClientRect().top + window.scrollY - 100 : 0;
      });

      // Find the current section
      const currentPosition = window.scrollY;
      let currentSection = sections[0];

      for (let i = 0; i < offsets.length; i++) {
        if (currentPosition >= offsets[i]) {
          currentSection = sections[i];
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" : "bg-background"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold text-primary"
        >
          Abiola Obafemi
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.05 }}
              className={`text-lg font-medium transition-colors ${
                activeSection === item.href 
                  ? "text-primary font-semibold border-b-2 border-primary" 
                  : "text-foreground hover:text-primary"
              }`}
              onClick={() => scrollToSection(item.href)}
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle>Navigation Menu</SheetTitle>
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className={`text-lg font-medium transition-colors text-left ${
                    activeSection === item.href 
                      ? "text-primary font-semibold" 
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => {
                    scrollToSection(item.href);
                    document.querySelector('[data-radix-collection-item]')?.click(); // Close sheet when clicking a nav item
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}