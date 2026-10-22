
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

export const db = mongoClient.db(
  process.env.MONGODB_DB || "bazardor-auth"
);
