import { 
  type User, type InsertUser,
  type Lead, type InsertLead,
  type VirtualTour, type InsertVirtualTour,
  type YandexMapsEntry, type InsertYandexMapsEntry,
  type GeneratedText, type InsertGeneratedText
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  updateLeadStatus(id: string, status: string): Promise<Lead | undefined>;
  getLeadById(id: string): Promise<Lead | undefined>;

  // Virtual Tours
  createVirtualTour(tour: InsertVirtualTour): Promise<VirtualTour>;
  getVirtualTours(): Promise<VirtualTour[]>;
  getVirtualTourById(id: string): Promise<VirtualTour | undefined>;
  deleteVirtualTour(id: string): Promise<boolean>;

  // Yandex Maps
  createYandexMapsEntry(entry: InsertYandexMapsEntry): Promise<YandexMapsEntry>;
  getYandexMapsEntries(): Promise<YandexMapsEntry[]>;
  getYandexMapsEntryById(id: string): Promise<YandexMapsEntry | undefined>;

  // Generated Texts
  createGeneratedText(text: InsertGeneratedText): Promise<GeneratedText>;
  getGeneratedTexts(): Promise<GeneratedText[]>;
  getGeneratedTextById(id: string): Promise<GeneratedText | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leads: Map<string, Lead>;
  private virtualTours: Map<string, VirtualTour>;
  private yandexMapsEntries: Map<string, YandexMapsEntry>;
  private generatedTexts: Map<string, GeneratedText>;

  constructor() {
    this.users = new Map();
    this.leads = new Map();
    this.virtualTours = new Map();
    this.yandexMapsEntries = new Map();
    this.generatedTexts = new Map();

    // Create default admin user
    const adminId = randomUUID();
    const adminUser: User = {
      id: adminId,
      username: "admin",
      password: "smart360admin" // In production, this should be hashed
    };
    this.users.set(adminId, adminUser);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Lead methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const lead: Lead = { 
      ...insertLead,
      email: insertLead.email || null,
      message: insertLead.message || null,
      id, 
      createdAt: new Date(),
      status: "new"
    };
    this.leads.set(id, lead);
    return lead;
  }

  async getLeads(): Promise<Lead[]> {
    return Array.from(this.leads.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead | undefined> {
    const lead = this.leads.get(id);
    if (lead) {
      lead.status = status;
      this.leads.set(id, lead);
      return lead;
    }
    return undefined;
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    return this.leads.get(id);
  }

  // Virtual Tour methods
  async createVirtualTour(insertTour: InsertVirtualTour): Promise<VirtualTour> {
    const id = randomUUID();
    const tour: VirtualTour = { 
      ...insertTour, 
      id, 
      uploadedAt: new Date(),
      isActive: true
    };
    this.virtualTours.set(id, tour);
    return tour;
  }

  async getVirtualTours(): Promise<VirtualTour[]> {
    return Array.from(this.virtualTours.values()).filter(tour => tour.isActive);
  }

  async getVirtualTourById(id: string): Promise<VirtualTour | undefined> {
    return this.virtualTours.get(id);
  }

  async deleteVirtualTour(id: string): Promise<boolean> {
    const tour = this.virtualTours.get(id);
    if (tour) {
      tour.isActive = false;
      this.virtualTours.set(id, tour);
      return true;
    }
    return false;
  }

  // Yandex Maps methods
  async createYandexMapsEntry(insertEntry: InsertYandexMapsEntry): Promise<YandexMapsEntry> {
    const id = randomUUID();
    const entry: YandexMapsEntry = { 
      ...insertEntry,
      description: insertEntry.description || null,
      workingHours: insertEntry.workingHours || null,
      id, 
      createdAt: new Date()
    };
    this.yandexMapsEntries.set(id, entry);
    return entry;
  }

  async getYandexMapsEntries(): Promise<YandexMapsEntry[]> {
    return Array.from(this.yandexMapsEntries.values());
  }

  async getYandexMapsEntryById(id: string): Promise<YandexMapsEntry | undefined> {
    return this.yandexMapsEntries.get(id);
  }

  // Generated Text methods
  async createGeneratedText(insertText: InsertGeneratedText): Promise<GeneratedText> {
    const id = randomUUID();
    const text: GeneratedText = { 
      ...insertText, 
      id, 
      createdAt: new Date()
    };
    this.generatedTexts.set(id, text);
    return text;
  }

  async getGeneratedTexts(): Promise<GeneratedText[]> {
    return Array.from(this.generatedTexts.values()).sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getGeneratedTextById(id: string): Promise<GeneratedText | undefined> {
    return this.generatedTexts.get(id);
  }
}

export const storage = new MemStorage();
