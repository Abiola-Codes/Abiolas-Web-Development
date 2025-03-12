import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 45 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20 
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            size="icon"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <ArrowUp className="h-5 w-5" />
            </motion.div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}