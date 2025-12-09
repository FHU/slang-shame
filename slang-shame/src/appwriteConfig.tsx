import { Client, TablesDB, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const database_id = import.meta.env.VITE_APPWRITE_DB_ID;
console.log("Database ID:", database_id);
console.log("Project ID:", import.meta.env.VITE_APPWRITE_PROJECT_ID);
console.log("Endpoint:", import.meta.env.VITE_APPWRITE_ENDPOINT);

export const database = new TablesDB(client);
export const account = new Account(client);

// Helper function to ensure anonymous session exists
export const ensureSession = async () => {
  try {
    // Check if session already exists
    await account.get();
    console.log("Session already exists");
  } catch {
    // No session exists, create anonymous session
    try {
      await account.createAnonymousSession();
      console.log("Anonymous session created");
    } catch (error) {
      console.error("Error creating anonymous session:", error);
      throw error;
    }
  }
};

export { client, database_id };