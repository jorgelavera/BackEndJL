import mongoose from "mongoose";

export default class MongoSingleton {
    static #instance;
    constructor(){
        mongoose.connect(mongoose_conn_str);
    }
    static getInstance(){
        if(this.#instance){
            console.log('Instance already exists');
            return this.#instance;
        }
        this.#instance = new MongoSingleton();
        console.log('Connected to Mongo');
        return this.#instance;
    }
}
