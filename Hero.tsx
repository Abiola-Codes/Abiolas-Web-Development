import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const textVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 }
  },
};

export default function Hero() {
  const title = "Hi, I'm Abiola Obafemi";
  const subtitle = "Young Programmer & Tech Enthusiast";

  return (
    <section id="home" className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <motion.span
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              {title.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className={char === "A" ? "text-primary" : ""}
                  style={{ display: 'inline-block' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              {subtitle.split("").map((char, index) => (
                <motion.span
                  key={index + title.length}
                  variants={letterVariants}
                  style={{ display: 'inline-block' }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          </h1>
          <motion.p 
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Passionate about coding, gaming, and building amazing things with technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" })}
              className="group"
            >
              Explore My Skills
              <ArrowDown className="ml-2 h-4 w-4 group-hover:animate-bounce" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.03, 
            rotate: 2,
            transition: { duration: 0.3 } 
          }}
          className="relative aspect-square"
        >
          <img
            src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Abiola's Programming Setup"
            className="rounded-lg object-cover shadow-xl"
          />
          <motion.div 
            className="absolute inset-0 bg-primary/10 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 bg-background p-3 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <span className="text-sm font-medium">Tech Enthusiast</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}