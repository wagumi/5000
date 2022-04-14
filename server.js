const crypto = require("crypto-js");
const fetch = require("node-fetch");
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
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
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

client.on("messageCreate", (message) => {
  if (
    message.channel.type == "DM" &&
    message.attachments.size &&
    !message.author.bot
  ) {
    if (!process.env.LIST_FILE_ADMIN.includes(message.author.id)) {
      const msg = `${message.author.username}<${message.author.id}>にはURLを追加する権限がありません`;
      message.author.send(msg).then(() => {
        console.log(msg);
      });
      return;
    }

    if (message.content === "RESET") {
      fs.writeFileSync(process.env.LIST_FILE_NAME, "");
      const msg = `${process.env.LIST_FILE_NAME}は初期化されました`;
      message.author.send(msg).then(() => {
        console.log(msg);
      });
    }
    const files = message.attachments;
    files.map((file) => {
      if (!file.url.endsWith(".txt")) return;
      getFile(file.url).then((str) => {
        const urls = str.split("\n");
        let count = urls.reduce((num, url) => {
          if (url.startsWith("http://POAP.xyz/")) {
            const crypted_text = crypto.AES.encrypt(
              url,
              process.env.CRYPTO_PWD
            ).toString();
            fs.appendFileSync(process.env.LIST_FILE_NAME, `${crypted_text}\n`);
            num += 1;
          }
          return num;
        }, 0);
        const total = countUrls();
        const msg = `${count}件のデータを追加しました。総件数:${total}件`;
        message.author.send(msg).then(() => {
          console.log(msg);
        });
      });
    });
  }
});

const getFile = async (url) => {
  const response = await fetch(url);
  return await response.text();
};

const countUrls = () => {
  const lock = new locker("locked.bin");
  try {
    const str = fs.readFileSync(process.env.LIST_FILE_NAME, "utf-8");
    const tmp = str.split("\n");
    const urls = Array.from(new Set(tmp));
    fs.writeFileSync(process.env.LIST_FILE_NAME, urls.join("\n"));
    return urls.length - 1;
  } catch (e) {
    console.log(e);
    return -1;
  } finally {
    lock.unlock();
  }
};

const deleteMintUrl = (userId) => {
  const lock = new locker("locked.bin");
  try {
    const users = JSON.parse(fs.readFileSync(process.env.MINTED_FILE_NAME));
    delete users[userId];
    fs.writeFileSync(
      process.env.MINTED_FILE_NAME,
      JSON.stringify(users, null, 2)
    );
    console.log(`${userId} reset`);
  } catch (e) {
    console.log(e);
  } finally {
    lock.unlock();
  }
};

const getMintUrl = (userId) => {
  let url = "";
  const lock = new locker("locked.bin");
  try {
    const users = JSON.parse(fs.readFileSync(process.env.MINTED_FILE_NAME));
    if (users[userId]) {
      url = decrypto(users[userId]);
      console.log(`${userId} ${url} Got Already`);
    } else {
      const str = fs.readFileSync(process.env.LIST_FILE_NAME, "utf-8");
      const urls = str.split("\n");
      url = urls.shift(); //length == 0 then return "undefined".
      if (!url) {
        url = "No valid URL remains.";
        throw url;
      }
      users[userId] = url;
      fs.writeFileSync(process.env.LIST_FILE_NAME, urls.join("\n"));
      fs.writeFileSync(
        process.env.MINTED_FILE_NAME,
        JSON.stringify(users, null, 2)
      );
      url = decrypto(url);
      console.log(`${userId} ${url}`);
    }
  } catch (e) {
    console.log(e);
  } finally {
    lock.unlock();
    return url;
  }
};

const decrypto = (data) => {
  const decrypted_text = crypto.AES.decrypt(data, process.env.CRYPTO_PWD);
  return decrypted_text.toString(crypto.enc.Utf8);
};

(async () => {
  console.log("login...");
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();
