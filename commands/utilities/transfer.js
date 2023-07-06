const { SlashCommandBuilder } = require('discord.js');
const { addBalance, getBalance } = require('./helpers/addBalance')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('transfer')
    .setDescription('Transfers funds to another user'),
    async execute(interaction) {
        const currentAmount = getBalance(interaction.user.id);
        const transferAmount = interaction.options.getInteger('amount');
        const transferTarget = interaction.options.getUser('user');
        if (transferAmount > currentAmount) return interaction.reply(`Sorry ${interaction.user}, you only have ${currentAmount}.`);
        if (transferAmount <= 0) return interaction.reply(`Please enter an amount greater than zero, ${interaction.user}.`);
        addBalance(interaction.user.id, -transferAmount);
        addBalance(transferTarget.id, transferAmount);
        return interaction.reply(`Successfully transferred ${transferAmount} to ${transferTarget.tag}. Your current balance is ${getBalance(interaction.user.id)}`);
    }
};