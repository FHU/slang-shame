import {Client, TablesDB} from "appwrite";

const client = new Client();

client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT);
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const database_id = import.meta.env.VITE_APPWRITE_DB_ID;
console.log(database_id)
const database = new TablesDB(client)

export { client, database, database_id };