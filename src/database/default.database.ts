import { DB_Modal } from "./model.database";
import { UserDatabase } from "./users.database";

export default class DB_Manager extends DB_Modal { // This is the class for the database manager
    
    constructor() {
        super();
        this.createTableFromConfig()
    }


    public userTable(): UserDatabase {
        return new UserDatabase()
    }
    
}