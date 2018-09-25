const message = async (client, msg) => {
  if (msg.author.bot || !msg.guild || !msg.content.startsWith(client.config.prefix)) return; // Don't listen to bots / DMs

  const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift()

  const commands = client.handlers.commands;
  const executable = commands.get(command)
  if (executable) {
    executable
      .run(client, msg, args)
      .catch(console.error)
  }
}

module.exports = message;
