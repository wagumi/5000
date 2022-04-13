const crypto = require("crypto-js");
const fs = require("fs");
const encrypted_list = [];
const str = fs.readFileSync("list.txt", "utf-8");
const urls = str.split("\n");
urls.map((url) => {
  const crypted_text = crypto.AES.encrypt(url, process.env.CRYPTO_PWD);
  encrypted_list.push(`${crypted_text}`);
});
fs.writeFileSync("encrypted_list.txt", encrypted_list.join("\n"));
