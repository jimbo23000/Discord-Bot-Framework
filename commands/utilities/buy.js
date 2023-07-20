const { SlashCommandBuilder } = require('discord.js');
const { Op } = require('sequelize');
const { users, currencyShop } = require('./dbObjects.js');
const { getBalance } = require('./helpers/addBalance')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('buy')
    .setDescription('Purchases an item from the shop'),
    async execute(interaction) {
        const itemName = interaction.options.getString('item');
        const item = await currencyShop.findOne({ where: { name: { [Op.like]: itemName } } });
        if (!item) return interaction.reply(`That item doesn't exist.`);
        if (item.cost > getBalance(interaction.user.id)) {
            return interaction.reply(`You currently have ${getBalance(interaction.user.id)}, but the ${item.name} costs ${item.cost}!`);
        }
        const user = await users.findOne({ where: { user_id: interaction.user.id } });
        addBalance(interaction.user.id, -item.cost);
        await user.addItem(item);
        return interaction.reply(`You've bought: ${item.name}.`);
    }
};