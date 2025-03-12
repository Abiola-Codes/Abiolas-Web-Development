import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { SiJavascript, SiPython, SiReact, SiHtml5, SiCss3, SiGit } from "react-icons/si";

const skills = [
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
  { name: "Python", icon: SiPython, color: "text-blue-400" },
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
  { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
  { name: "Git", icon: SiGit, color: "text-red-500" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
};

const iconAnimation = {
  hidden: { scale: 0, rotate: -15 },
  show: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.2
    }
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <motion.h2 
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Technical Skills
        </motion.h2>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Technologies I work with
        </motion.p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-3 gap-6"
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={skill.name} 
            variants={item}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="overflow-hidden hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <motion.div
                  variants={iconAnimation}
                  className="mb-4"
                  whileHover={{ 
                    rotate: 5,
                    scale: 1.1,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <skill.icon className={`w-12 h-12 mx-auto ${skill.color}`} />
                </motion.div>
                <motion.h3 
                  className="font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + (index * 0.1) }}
                >
                  {skill.name}
                </motion.h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
