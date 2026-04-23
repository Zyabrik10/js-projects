const net = require("node:net");
const prompt = require("prompt-sync")({ sigint: true });

let token;
const commands = new Set(["login", "signup", "send"]);

const client = net.createConnection({ port: 3000 }, () => {
  askCommands();
});
client.setEncoding("utf8");

client.on("data", function (data) {
  const str = data.split(" ").length;
  if (str[0] === "token") {
    token = str[1];
    console.log("Token acquired");
    return;
  }

  console.log(data);
  askCommands();
});

function askCommands() {
  while (true) {
    const data = prompt("> ");
    const [command, arg1, arg2] = data.split(" ");

    if (!commands.has(command) || !arg1 || !arg2) {
      console.log("Wrong command!", `${command}, ${arg1}, ${arg2}\n`);
      continue;
    }

    client.write(
      `${command} ${arg1} ${arg2} ${JSON.stringify(client.address())} ${token}`,
    );
    return;
  }
}
