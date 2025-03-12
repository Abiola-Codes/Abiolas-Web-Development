
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className="py-6 border-t"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Abiola Obafemi. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}
