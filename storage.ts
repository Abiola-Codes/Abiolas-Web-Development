import { messages, certificates, type Message, type InsertMessage, type Certificate, type InsertCertificate } from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
  getCertificates(): Promise<Certificate[]>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .orderBy(desc(messages.createdAt));
  }

  async getCertificates(): Promise<Certificate[]> {
    return await db
      .select()
      .from(certificates);
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const [certificate] = await db
      .insert(certificates)
      .values(insertCertificate)
      .returning();
    return certificate;
  }
}

export const storage = new DatabaseStorage();