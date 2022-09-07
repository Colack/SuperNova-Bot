const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const verLink = "https://colack.github.io/verified.json";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('project')
		.setDescription('Replies with a code.org projects information.')
		.addStringOption(option => 
			option.setName('id')
				.setDescription('The Code.org Project ID.')
				.setRequired(true))
		.addBooleanOption(option =>
      option.setName('showid')
      .setDescription('Show the Projects ID?')
      .setRequired(true)),
	async execute(interaction) {
		const url = "https://studio.code.org/v3/channels/" + interaction.options.getString('id');
		const responce = await fetch(url);
		const data = await responce.json();

		const ver = await fetch(verLink);
		const verdata = await ver.json();
		if (data) {
			var pic = "";
			var type = "";
			var pubd = "";
			var projectName = "Getting..";
			var projectType = "Loading..";
			var thumbnail = "code";
			var stateDescription = "";
			var stateDetails = "";
			var isID = "";

			projectName = data.name;
      projectType = data.projectType;

			pic = "js";
			
			if(data.publishedAt==null){pubd="Not published."}else{pubd="Published."}
			if(projectType=="gamelab"){pic="js"; type="Javascript"}
			if(projectType=="gamelab"){projectType="Game Lab";}
      if(projectType=="applab"){projectType="App Lab";}
      if(projectType=="playlab"){projectType="Play Lab"; type="Blocks"; pic="block"}
      if(projectType=="dancelab"){projectType="Dance Lab"; type="Blocks"; pic="block"}

			thumbnail = "https://studio.code.org" + data.thumbnailUrl;
      stateDescription = "Project Type: " + projectType;
			
			for (var i = 0; i < verdata.verified.length; i++) {
        if (verdata.verified[i] == interaction.options.getString('id')) {
          pic = "verified";
          type = "Verified Project";
          stateDetails = projectName + " ✅";
          stateDescription = "Project Type:  " + projectType;
      	}
			}

			if (pic == "verified") {
				pic = "https://www.pngkey.com/png/full/624-6246436_verified-account-icon-selo-verificao-instagram-png.png";
			} else if (pic == "js") {
				pic = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png";
			} else if (pic == "block") {
				pic = "https://icons.iconarchive.com/icons/papirus-team/papirus-apps/512/codeblocks-icon.png";
			}
			
			if (interaction.options.getBoolean('showid') == true) {
				isID = interaction.options.getString('id');
			} else if (interaction.options.getBoolean('showid') == false) {
				isID = "ID Hidden.";
			}
			
			const embed = new EmbedBuilder()
				.setColor('#ff6633')
				.setTitle('Project: ' + projectName)
				.setDescription(stateDescription)
				.setAuthor({name: 'CDO', iconURL: pic, url: 'https://www.code.org'})
				.setThumbnail(thumbnail)
				.addFields(
					{
						name: "ID",
						value: isID
					},
					{
						name: "Is Published?",
						value: pubd
					}
				)
				.setTimestamp()
				.setFooter({ text: 'Generated By Applab', iconURL: 'https://code.org/images/app-lab/applab-tool.png' });

			try {
				await interaction.reply({
					embeds: [embed]
				});
			} catch (err) {
				await interaction.reply(`Could not gather project details.....`);
			}
			
		}
	}
};