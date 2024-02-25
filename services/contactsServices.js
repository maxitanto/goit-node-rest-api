import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

export async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find(item => item.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return result;
}

export async function addContact({ name, email, phone }) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
}

export async function updateContact(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...data };
  await updateContacts(contacts);
  return contacts[index];
}
