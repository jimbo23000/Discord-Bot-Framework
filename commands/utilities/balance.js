const { SlashCommandBuilder } = require('discord.js');
const { getBalance } = require('./helpers/addBalance');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Gets the balance of a user'),
    async execute(interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;
		return interaction.reply(`${target.tag} has ${getBalance(target.id)}`);
    },
};