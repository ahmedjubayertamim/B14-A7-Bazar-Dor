
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const globalForMongo = globalThis;

globalForMongo._bazarMongoClient ??= new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});

export const mongoClient = globalForMongo._bazarMongoClient;

const databaseName = process.env.MONGODB_DB;

if (!databaseName && process.env.NODE_ENV === "production") {
  throw new Error("MONGODB_DB is missing");
}

export const db = mongoClient.db(databaseName || "bazardor-auth");
