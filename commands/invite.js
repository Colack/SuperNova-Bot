const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Sends the bots invite link.'),
	async execute(interaction) {
		await interaction.reply(`https://discord.com/api/oauth2/authorize?client_id=1016093138781212704&permissions=446744087616&scope=bot`);
	},
};
