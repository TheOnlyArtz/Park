const message = async (client, msg) => {
  if (msg.author.bot || !msg.guild || !msg.startsWith(client.config.token)) return; // Don't listen to bots / DMs
}

module.exports = message;
