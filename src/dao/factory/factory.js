import mongoose from "mongoose";
import config from "../../configs/config.js";

export let Contacts;

switch (config.persistence) {
  case "MONGO":
    const { default: contactMongo } = await import(
      "../mongo/contacts.mongo.js"
    );
    mongoose.connect(mongoose_conn_str);
    Contacts = new contactMongo();
    break;
  case "MEMORY":
    const { default: contactMemory } = await import(
      "../memory/contacts.memory.js"
    );
    Contacts = new contactMemory();
    break;
}
