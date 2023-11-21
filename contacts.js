const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

// Шлях до файлу contacts.json
const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [deletedBook] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedBook;
}

async function addContact(name, email, phone) {
  const books = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  books.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(books, null, 2));
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
