

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Resume() {
  return (
    <section id="resume" className="py-16">
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
          My Resume
        </motion.h2>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          View my resume to learn more about my experience and skills
        </motion.p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="py-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Abiola Obafemi</h3>
              <p className="text-muted-foreground mb-6">
                Young Programmer & Tech Enthusiast
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  className="group"
                  onClick={() => window.open("https://1drv.ms/w/c/80af91c203e3244b/EWwud4PLPhdFnnZD0nmLTEAB9UIEqVzKKilF1vll77kdNA?e=H6ODmD", "_blank")}
                >
                  View Resume
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
