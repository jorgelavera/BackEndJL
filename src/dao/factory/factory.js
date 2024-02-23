import mongoose from "mongoose";
import config from "../../configs/config";

export let Contacts;

switch (config.persistence) {
    case 'MONGO':
        const {default : contactMongo} = await import('../')
}