import { Client, Account, Databases, Storage, Avatars } from "appwrite";
import { readAppwriteConfig } from "./environment";

export const appwriteConfig = readAppwriteConfig(import.meta.env);

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
