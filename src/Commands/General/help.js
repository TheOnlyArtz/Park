const Discord = require('discord.js');

let toSend;

const run = async (client, msg, args) => {
  // If the message is cached, return and send it.
  if (toSend) return msg.channel.send({embed: toSend});

  // The client's prefix
  // A variable to know when the loop has been finished
  const prefix = client.config.prefix
  let processed = 0;
  // The initial text array to built up for the help commands containing all the commands
  let textArr = [
    "```asciidoc",
    "Those are my commands:"
  ];

  // Load all the available commands in an Array
  const commandsArray = client.handlers.commands.array();
  const commandsCategories = client.handlers.commandsCategories; // An array of available categories
  // Loop through the commands
  commandsCategories.forEach(category => {

    // Increment the amount of items which been processed
    processed++

    // Check if there's the category in the text, if not, add it!
    if (!textArr.filter(a => a === `\n== ${category} ==`).length) {
      textArr.push(`\n== ${category} ==`);
    }

    // Add the commands of the following category to the text
    const categoryCommands = commandsArray.filter(i => i.category === category);

    let looping = 0
    categoryCommands.forEach((o, i) => {
      textArr.push(`${prefix + o.name} -> ${o.help.description || "This command has no description"}`)
    })
    if (processed === commandsCategories.length) textArr.push('```');
  });

  // Build up the embed with the text from the Array 'textArr'
  // Cache the message to not do this process over and over again, just once.
  toSend = textArr.join('\n');

  msg.channel.send(toSend);
}

module.exports = run;
module.exports.help = {
  description: "Basically this command"
}
