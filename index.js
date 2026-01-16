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

let lastSentDate = { "11am": "", "5pm": "" };

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const channelId = "1461798627503640780";

  // Check every minute for scheduled times
  setInterval(() => {
    // Get current time in EST
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
    );
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const dateKey = now.toDateString(); // e.g., "Thu Jan 16 2026"

    console.log(
      `Current EST time: ${hours}:${minutes.toString().padStart(2, "0")}`,
    );

    // Send at 11:00 AM EST (TESTING: temporarily set to 15:05 EST for 4 min test)
    if (hours === 11 && minutes === 0 && lastSentDate["11am"] !== dateKey) {
      lastSentDate["11am"] = dateKey;
      console.log("Sending TEST message...");
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send({
          content: `<@423695908262379520> get to work
https://tenor.com/view/richard-attenborough-whip-whipped-whiplash-whiplashed-gif-16685949900343051341`,
        });
      }
    }

    // Send at 5:00 PM EST
    if (hours === 17 && minutes === 0 && lastSentDate["5pm"] !== dateKey) {
      lastSentDate["5pm"] = dateKey;
      console.log("Sending 5 PM message...");
      const channel = client.channels.cache.get(channelId);
      if (channel) {
        channel.send({
          content: `<@423695908262379520> get to work
https://tenor.com/view/richard-attenborough-whip-whipped-whiplash-whiplashed-gif-16685949900343051341`,
        });
      }
    }
  }, 60000); // Check every 60 seconds

  console.log(
    "Bot is ready and checking for scheduled times every minute (EST timezone)",
  );
});

client.login(process.env.DISCORD_TOKEN);

/* client.on("messageCreate", async (message) => {
  console.log(message);

  if (!message?.author.bot) {
    // Send to a specific channel by ID
    const channelId = "1461798627503640780"; // Replace with your channel ID
    const channel = client.channels.cache.get(channelId);

    if (channel) {
      channel.send({
        content: `<@423695908262379520> get to work 
https://tenor.com/view/richard-attenborough-whip-whipped-whiplash-whiplashed-gif-16685949900343051341`,
      });
    }
  } 
}); */
