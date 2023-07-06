const { SlashCommandBuilder } = require('discord.js');
const { currency } = require('./helpers/addBalance')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Lists the top ten wealthiest users in the server'),
    async execute(interaction) {
        return interaction.reply(
            codeBlock(
                currency.sort((a, b) => b.balance - a.balance)
                    .filter(user => client.users.cache.has(user.user_id))
                    .first(10)
                    .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}`)
                    .join('\n'),
            ),
        );
    }
};