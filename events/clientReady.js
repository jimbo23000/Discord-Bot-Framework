const { Events } = require('discord.js');
// Database synchronization implementation
const { users } = require('./dbObjects.js');
const { currency } = require('./helpers/addBalance');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		// Database synchronization implementation
		const storedBalances = await users.findAll();
		storedBalances.forEach(i => currency.set(i.user_id, i));

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};