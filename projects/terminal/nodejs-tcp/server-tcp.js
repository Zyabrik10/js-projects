const net = require("node:net");

const users = [];

const server = net.createServer((socket) => {
  socket.setEncoding("utf-8");

  socket.on("data", (data) => {
    const [command, arg1, arg2, clientInfo, userToken] = data.split(" ");

    if (command === "signup") {
      const user = users.find((usr) => usr.email === arg1);

      if (user) {
        socket.write(`${arg1} user already exists`);
        return;
      }

      const token = `${clientInfo}.${arg1}.${arg2}.${crypto.randomUUID()}`;

      users.push({
        email: arg1,
        password: arg2,
        token,
        clientInfo: JSON.parse(clientInfo),
      });

      socket.write(`token ${token}`);
      console.log("New user signup");
    } else if (command === "login") {
      const user = users.find((usr) => usr.email === arg1);

      if (!user) {
        socket.write(`${arg1} user is not found`);
        return;
      }

      if (arg2 === user.password) {
        socket.write(`token ${user.token}`);
        console.log("User logged in");
        return;
      }
    } else if (command === "send") {
      const authedUser = users.find((usr) => {
        console.log(usr.token, userToken);
        return usr.token === userToken;
      });

      if (!authedUser) {
        socket.write(`${arg1} not authed`);
        return;
      }

      const user = users.find((usr) => usr.email === arg1);

      if (!user) {
        socket.write(`${arg1} user is not found`);
        return;
      }

      socket.write("Your message has been sent to", arg1);
    }
  });

  console.log("User has been connected");
});

server.listen(3000, () => {
  console.log("Server is running on 3000 port");
});
