import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";
import schedule from "node-schedule";

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

  const channelId = "1461798627503640780";

  // Schedule message at 11:00 AM EST (Eastern Time)
  schedule.scheduleJob("0 11 * * *", { tz: "America/New_York" }, () => {
    const channel = client.channels.cache.get(channelId);
    if (channel) {
      channel.send({
        content: `<@423695908262379520> get to work
https://tenor.com/view/richard-attenborough-whip-whipped-whiplash-whiplashed-gif-16685949900343051341`,
      });
    }
  });

  // Schedule message at 5:00 PM EST (Eastern Time)
  schedule.scheduleJob("0 17 * * *", { tz: "America/New_York" }, () => {
    const channel = client.channels.cache.get(channelId);
    if (channel) {
      channel.send({
        content: `<@423695908262379520> get to work
https://tenor.com/view/richard-attenborough-whip-whipped-whiplash-whiplashed-gif-16685949900343051341`,
      });
    }
  });
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
