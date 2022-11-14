const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("song")
    .setDescription("Posts a recommended song"),
  async execute(interaction) {
		const songs = [
			"Self Esteem - The Offspring",
			"T.N.T - AC/DC",
			"Back In Black - AC/DC"
		];
		const random = Math.floor((Math.random()*songs.length))
    await interaction.reply(
      `I would recommend listening to \"${songs[random]}\"`
    );
  },
};
