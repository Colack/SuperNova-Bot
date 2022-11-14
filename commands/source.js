const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("source")
    .setDescription("View the official source code for SuperNova"),
  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor("#ff6633")
      .setTitle("Invite")
      .setDescription(
        "View our Source Code - https://github.com/Colack/SuperNova-Bot"
      )
      .setTimestamp()
      .setFooter({
        text: "Generated By SuperNova",
        iconURL: "https://github.com/Colack/SuperNova-Bot/blob/main/assets/Colack_A_supernova_exploding_with_code_fec0a35f-a74b-4317-b3cb-afcc34593082.png?raw=true",
      });

    try {
      await interaction.reply({
        embeds: [embed],
      });
    } catch (err) {
      await interaction.reply(
        `Could not gather details.....`
      );
    }
  },
};
