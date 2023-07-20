const { SlashCommandBuilder } = require('discord.js');
const { currencyShop } = require('./dbObjects.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Lists all the items available in the shop'),
    async execute(interaction) {
        const items = await currencyShop.findAll();
        return interaction.reply(codeBlock(items.map(i => `${i.name}: ${i.cost}`).join('\n')));
    }
};