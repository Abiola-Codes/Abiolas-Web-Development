import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FileText, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
};

export default function Certificates() {
  const { data: certificates, isLoading, error } = useQuery<Certificate[]>({
    queryKey: ["/api/certificates"],
    retry: 2,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const openCertificate = (url: string) => {
    // Handle both absolute and relative URLs
    const certificateUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
    window.open(certificateUrl, '_blank');
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load certificates. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <section id="certificates" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Certificates</h2>
        <p className="text-muted-foreground">My Learning Journey</p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Loading skeletons
          [...Array(3)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="w-full aspect-video" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          certificates?.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:border-primary transition-colors">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-muted flex items-center justify-center">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{cert.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{cert.issuer}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {cert.date}
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => openCertificate(cert.image)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      View Certificate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}