const { SlashCommandBuilder } = require('discord.js');
const { CurrencyShop } = require('./dbObjects.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Gets all the items available in the shop'),
    async execute(interaction) {
        const items = await CurrencyShop.findAll();
        return interaction.reply(codeBlock(items.map(i => `${i.name}: ${i.cost}`).join('\n')));
    }
};