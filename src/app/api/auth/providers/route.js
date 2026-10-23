const providerIsConfigured = (provider) =>
  process.env[`NEXT_PUBLIC_${provider.toUpperCase()}_AUTH_ENABLED`] === "true" &&
  Boolean(
    process.env[`${provider.toUpperCase()}_CLIENT_ID`]?.trim() &&
      process.env[`${provider.toUpperCase()}_CLIENT_SECRET`]?.trim()
  );

export function GET() {
  return Response.json({
    google: providerIsConfigured("google"),
    github: providerIsConfigured("github"),
  });
}
