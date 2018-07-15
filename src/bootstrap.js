const {token} = require('./Private/config.json');

const Park = require('./Models/Park');// also the "client".
const park = new Park(token, {disableEveryone: true})

park.connect()  // connect the "client".

park.on('ready', () => {
  console.log("I'm ready for work!");
})
