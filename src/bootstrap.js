const config = require('./Private/config.json');

const Park = require('./Models/Park');// also the "client".
const park = new Park(config.token, {disableEveryone: true}, config);

park.connect()  // connect the "client".
