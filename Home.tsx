import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Certificates from "@/components/sections/Certificates";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Section transition variants
const sectionVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background text-foreground overflow-hidden"
    >
      <NavBar />
      <main className="container mx-auto px-4 space-y-24 py-24">
        <motion.div variants={sectionVariants}>
          <Hero />
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.25 }}
        >
          <Skills />
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.25 }}
        >
          <Certificates />
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.25 }}
        >
          <Resume /> {/* Added Resume section */}
        </motion.div>

        <motion.div 
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.25 }}
        >
          <Contact />
        </motion.div>
      </main>
      <Footer />
      <ScrollToTop />

      {/* Background animation */}
      <motion.div 
        className="fixed top-0 right-0 w-full h-full -z-10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-40 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
      </motion.div>
    </motion.div>
  );
}