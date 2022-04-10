const fs = require("fs");
const locker = require("node-file-lock");
const { Client, Intents } = require("discord.js");
const http = require("http");

http
  .createServer(function (req, res) {
    res.write("OK");
    res.end();
  })
  .listen(8080);

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ["MESSAGE", "CHANNEL"],
});

client.once("ready", async () => {
  const data = require("./commands/slashCommand.json");
  const commands = await client.guilds.cache
    .get(process.env.SERVER_ID)
    .commands.set(data);

  const commandPermissions = require("./commands/commandPermission.json");
  commands.map(async (command) => {
    console.log(command.id, command.name);
    await client.guilds.cache
      .get(process.env.SERVER_ID)
      .commands.permissions.add({
        command: command.id,
        permissions: commandPermissions,
      });
  });
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isCommand()) {
      return;
    }
    const { commandName } = interaction;
    //get_poap
    if (commandName === "get_poap") {
      try {
        const userId = interaction.user.id;
        const url = getMintUrl(userId);
        await interaction.reply({
          content: url,
          ephemeral: true,
        });
      } catch (e) {
        console.log(e);
      }
      //reset_mint
    } else if (commandName === "reset_mint") {
      try {
        const userId = interaction.user.id;
        deleteMintUrl(userId);
        await interaction.reply({
          content: "MINT has been reset.",
          ephemeral: true,
        });
      } catch (e) {
        console.log(e);
      }
      //reset_user
    } else if (commandName === "reset_user") {
      try {
        const userId = interaction.options.getUser("user").id;
        deleteMintUrl(userId);
        await interaction.reply({
          content: "MINT has been reset.",
          ephemeral: true,
        });
      } catch (e) {
        console.log(e);
      }
      //ping
    } else if (commandName === "ping") {
      await interaction.reply({
        content: "pong",
        ephemeral: true,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

const deleteMintUrl = (userId) => {
  try {
    const lock = new locker("locked.bin");
    const users = JSON.parse(fs.readFileSync("./minted.json"));
    delete users[userId];
    fs.writeFileSync("./minted.json", JSON.stringify(users, null, 2));
    console.log(`${userId} reset`);
  } catch (e) {
    console.log(e);
  } finally {
    lock.unlock();
  }
};

const getMintUrl = (userId) => {
  try {
    let url = "";
    const lock = new locker("locked.bin");
    const users = JSON.parse(fs.readFileSync("./minted.json"));
    if (users[userId]) {
      url = users[userId];
      console.log(`${userId} ${url} Got Already`);
    } else {
      const str = fs.readFileSync("./list.txt", "utf-8");
      const urls = str.split("\n");
      url = urls.shift();
      users[userId] = url;
      fs.writeFileSync("./list.txt", urls.join("\n"));
      fs.writeFileSync("./minted.json", JSON.stringify(users, null, 2));
      console.log(`${userId} ${url}`);
    }
  } catch (e) {
    console.log(e);
  } finally {
    lock.unlock();
    return url;
  }
};

(async () => {
  console.log("login...");
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();
