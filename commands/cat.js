const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("cat")
		.setDescription("Grabs a random cat off the internet."),
	async execute(interaction) {
		const responce = await fetch("https://api.thecatapi.com/v1/images/search");
		const data = await responce.json();
		if (data) {
			const embed = new EmbedBuilder()
				.setColor("#ff6633")
        .setTitle("Kitty")
        .setDescription("Random Cat")
        .setImage(data[0].url)
        .setTimestamp()
				.setFooter({
          text: "Generated By SuperNova",
          iconURL: "https://github.com/Colack/SuperNova-Bot/blob/main/assets/Colack_A_supernova_exploding_with_code_fec0a35f-a74b-4317-b3cb-afcc34593082.png?raw=true",
        });
			try {
				await interaction.reply({ embeds: [embed ]});
			} catch (err) {
				await interaction.reply(`Could not gather details.....`);
			}
		}
	}
}
