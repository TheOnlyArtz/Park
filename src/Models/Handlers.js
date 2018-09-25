const {Collection} = require('discord.js');
const fs = require('fs');

/**
* @param {Object<String>} paths An object of string representing the path where the events and commands are
*/
class Handlers {
  constructor(client, paths) {
    this.commands = new Collection;
    this.events = new Collection;

    this.commandsCategories = ['Parent']

    this.client = client;
    this.commandsPath = paths.commands;
    this.eventsPath = paths.events;
  }

  eventsHandler() {
    const path = this.eventsPath;
    const files = fs.readdirSync(path);
    const client = this.client;

    // 'full' stands for the full name of the file (ready.js)
    // 'short' stadns for the name without extension (ready)
    files.forEach((full) => {
      const short = full.replace(/\.js/g, '');
      const run = require(`${path}/${full}`);

      this.events.set(short, run)
      this.client.on(short, (...args) => {run(this.client, ...args)});
    });
  }

  commandsHandler(path = this.commandsPath, categoryName = 'Parent') {
    const files = fs.readdirSync(path);

    files.forEach((full) => {
      const short = full.replace(/\.js/g, '');
      const category = short === full ? true : false;
      const setCommand = (name, command) => {
        this.commands.set(name, {
        name,
        run: command,
        help: command.help || {},
        category: categoryName
        })
      }

      if (category) {
        this.commandsHandler(`${path}/${short}`, full)
        this.commandsCategories.push(full)
      } else {
        const command = require(`${path}/${full}`);
        setCommand(short, command)
      }

    })
  }
}

module.exports = Handlers;
