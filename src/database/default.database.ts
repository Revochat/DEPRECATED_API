import { DB_Modal } from "./components/model.database";
import UserDatabase from "./components/users.database";

export default class DB_Manager extends DB_Modal { // This is the class for the database manager
    
    public users: UserDatabase =  new UserDatabase(super.getDB())

    constructor() {
        super();
        this.createTableFromConfig()
    }
    
}