import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Schedule a message at a specific time
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Send message at specific time (e.g., 9:00 AM)
    if (hours === 9 && minutes === 0) {
      const channelId = "1461798627503640780";
      const channel = client.channels.cache.get(channelId);

      if (channel) {
        channel.send(`<@423695908262379520> get to work`);
      }
    }
  }, 60000); // Check every minute (60000 milliseconds)
});

client.login(process.env.DISCORD_TOKEN);

client.on("messageCreate", async (message) => {
  console.log(message);

  if (!message?.author.bot) {
    // Send to a specific channel by ID
    const channelId = "1461798627503640780"; // Replace with your channel ID
    const channel = client.channels.cache.get(channelId);

    if (channel) {
      channel.send(`<@423695908262379520> get to work`);
    }
  }
});
