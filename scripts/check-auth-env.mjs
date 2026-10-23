import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const localOrigin = "http://localhost:3000";
const productionOrigin =
  "https://bazar-dor-ahmedjubayertamim.vercel.app";
const variableNames = [
  "MONGODB_URI",
  "MONGODB_DB",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "NEXT_PUBLIC_BETTER_AUTH_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "NEXT_PUBLIC_GOOGLE_AUTH_ENABLED",
  "NEXT_PUBLIC_GITHUB_AUTH_ENABLED",
];
const urlVariableNames = [
  "BETTER_AUTH_URL",
  "NEXT_PUBLIC_BETTER_AUTH_URL",
];

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const values = {};

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);

    if (!match) {
      continue;
    }

    const value = match[2].replace(/^(['"])(.*)\1$/, "$2");
    values[match[1]] = value;
  }

  return values;
}

const fileValues = {
  ...parseEnvFile(path.resolve(".env")),
  ...parseEnvFile(path.resolve(".env.local")),
};
const values = Object.fromEntries(
  variableNames.map((name) => [
    name,
    process.env[name] ?? fileValues[name] ?? "",
  ])
);

const report = Object.fromEntries(
  variableNames.map((name) => [
    name,
    {
      present: Boolean(values[name].trim()),
      ...(urlVariableNames.includes(name)
        ? {
            matchesLocalOrigin:
              values[name].replace(/\/+$/, "") === localOrigin,
            matchesProductionOrigin:
              values[name].replace(/\/+$/, "") === productionOrigin,
          }
        : {}),
    },
  ])
);

console.log(JSON.stringify(report, null, 2));
