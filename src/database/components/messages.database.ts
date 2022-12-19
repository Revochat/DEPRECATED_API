import { Database } from "sqlite3";
import { UserInterface } from "../../client";

class MessagesDatabase { // user database class
    protected db: Database;

    constructor(database: Database){
        this.db = database
    }
}

export default MessagesDatabase