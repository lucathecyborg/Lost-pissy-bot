import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";
import cron from "node-cron";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let lastSentDate = { "11am": "", "5pm": "" };

client.on("clientReady", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const channelId = "1461798627503640780";

  // Schedule for 11:00 AM EST every day
  cron.schedule('0 11 * * *', () => {
    const dateKey = new Date().toDateString();
    
    if (lastSentDate["11am"] === dateKey) {
      console.log("11 AM message already sent today, skipping...");
      return;
    }
    
    lastSentDate["11am"] = dateKey;
    console.log("Attempting to send 11 AM message...");
    
    const channel = client.channels.cache.get(channelId);
    
    if (!channel) {
      console.error("❌ Channel not found! Bot might not have access to this channel.");
      return;
    }
    
    console.log(`✓ Channel found: ${channel.name}`);
    
    channel.send({
      content: `<@423695908262379520> get to work
https://tenor.com/view/richard-attenborough-whip-whipped-whiplash-whiplashed-gif-16685949900343051341`,
    })
    .then(() => console.log("✓ 11 AM message sent successfully!"))
    .catch(err => console.error("❌ Failed to send 11 AM message:", err.message));
  }, {
    timezone: "America/New_York"
  });

  // Schedule for 5:00 PM EST every day
  cron.schedule('0 17 * * *', () => {
    const dateKey = new Date().toDateString();
    
    if (lastSentDate["5pm"] === dateKey) {
      console.log("5 PM message already sent today, skipping...");
      return;
    }
    
    lastSentDate["5pm"] = dateKey;
    console.log("Attempting to send 5 PM message...");
    
    const channel = client.channels.cache.get(channelId);
    
    if (!channel) {
      console.error("❌ Channel not found! Bot might not have access to this channel.");
      return;
    }
    
    console.log(`✓ Channel found: ${channel.name}`);
    
    channel.send({
      content: `<@423695908262379520> get to work
https://tenor.com/view/richard-attenborough-whip-whipped-whiplash-whiplashed-gif-16685949900343051341`,
    })
    .then(() => console.log("✓ 5 PM message sent successfully!"))
    .catch(err => console.error("❌ Failed to send 5 PM message:", err.message));
  }, {
    timezone: "America/New_York"
  });

  console.log("Bot is ready with cron scheduled tasks (EST timezone)");
  console.log("Scheduled: 11:00 AM EST and 5:00 PM EST daily");
});

// Error handling
client.on("error", (error) => {
  console.error("Discord client error:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
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
