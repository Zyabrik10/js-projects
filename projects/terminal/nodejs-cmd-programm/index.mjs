import {
  getContactById,
  listContacts,
  removeContact,
  addContact,
} from "./contacts.js";

import { logHelp } from "./logHelp.js";

import "colors";

import { Command } from "commander";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(console.table);
      break;

    case "get":
      getContactById(id).then(console.table);
      break;

    case "add":
      addContact({ name, email, phone }).then(console.table);
      break;

    case "remove":
      removeContact(id).then(console.table);
      break;

    case "help":
      logHelp();
      break;

    default:
      console.warn("Unknown action type!".red);
  }
}

invokeAction(argv);
