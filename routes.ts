import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertCertificateSchema } from "@shared/schema";
import path from "path";
import express from 'express';
import fs from "fs"; // Added to handle file system operations

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static assets with proper CORS and caching headers
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets'), {
    maxAge: '1d', // Cache for 1 day
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }));

  // Message routes
  app.post("/api/messages", async (req, res) => {
    try {
      const message = insertMessageSchema.parse(req.body);
      const createdMessage = await storage.createMessage(message);

      // Import is inside the route to avoid circular dependencies
      const { sendContactEmail } = await import('./email');

      // Send email notification (don't wait for it to complete)
      sendContactEmail({
        name: message.name,
        email: message.email,
        message: message.message
      }).catch(err => console.error('Failed to send email notification:', err));

      res.json(createdMessage);
    } catch (error) {
      res.status(400).json({ error: String(error) });
    }
  });

  app.get("/api/messages", async (_req, res) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });

  // Certificate routes with proper error handling
  app.get("/api/certificates", async (_req, res) => {
    try {
      const certificates = await storage.getCertificates();
      res.json(certificates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch certificates" });
    }
  });

  app.post("/api/certificates", async (req, res) => {
    try {
      const certificate = insertCertificateSchema.parse(req.body);
      const createdCertificate = await storage.createCertificate(certificate);
      res.json(createdCertificate);
    } catch (error) {
      res.status(400).json({ error: String(error) });
    }
  });

  // Serve resume file
  app.get("/resume", (req, res) => {
    const resumePath = path.join(__dirname, "../attached_assets/abiola_obafemi_resume.pdf");

    if (fs.existsSync(resumePath)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="abiola_obafemi_resume.pdf"'); // changed to attachment
      const fileStream = fs.createReadStream(resumePath);
      fileStream.pipe(res);
    } else {
      res.status(404).send('Resume file not found');
    }
  });


  const httpServer = createServer(app);
  return httpServer;
}