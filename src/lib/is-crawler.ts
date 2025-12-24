export function isCrawler(userAgent: string | null) {
  const ua = (userAgent ?? "").toLowerCase();

  // WhatsApp/Telegram link preview fetchers + common unfurl bots
  const bots = [
    "whatsapp",
    "telegrambot",
    "discordbot",
    "slackbot",
    "twitterbot",
    "facebookexternalhit",
    "linkedinbot",
    "embedly",
    "skypeuripreview",
  ];

  return bots.some((b) => ua.includes(b));
}
