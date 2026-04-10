import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import { format } from "path";

const contactsPath = format({
  root: "/",
  dir: "db",
  base: "contacts.json",
});

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (message) {
    return console.log(message);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.filter(({ id }) => id === contactId)[0];
    return contact || null;
  } catch (message) {
    console.log(message);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const contact = await getContactById(contactId);

    if (contact) {
      const newContacts = data.filter(({ id }) => id !== contactId);
      await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
    }

    return contact || null;
  } catch (message) {
    console.log(message);
  }
}

export async function addContact({ name, email, phone }) {
  try {
    if (!(name && email && phone)) return null;

    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    const contacts = await listContacts();
    const contact = await getContactById(newContact.id);

    if (contact) return null;

    const newContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
    return newContact;
  } catch (e) {
    console.error(e);
    return null;
  }
}
