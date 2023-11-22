const contacts = require("./contacts");
const argv = require("yargs").argv;


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const allContacts = await contacts.listContacts();
          console.table(allContacts);
      break;

    case "get":
          const oneContact = await contacts.getContactById(id);
          console.log(oneContact);
      break;

    case "add":
          const newContact = await contacts.addContact(name, email, phone);
          console.log(newContact);
      break;

    case "remove":
          const removedContact = await contacts.removeContact(id);
          console.log(removedContact);
          break;
      
      case "update":
          const updatedContact = await contacts.updateContact(id,  name, email, phone );
          console.log(updatedContact);
          break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
