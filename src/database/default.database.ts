import { UserInterface } from "../client/";
import { DB_Modal } from "./model.database";

export class DB_Manager extends DB_Modal { // This is the class for the database manager
    constructor() {
        super();
        this.createTableFromConfig()
    }

    public async createUser(user: UserInterface): Promise<boolean> { // create a user in the database
        return new Promise((resolve, reject) => {
            this.db.exec(`INSERT INTO user(token, name, created_at) VALUES(${user.token},${user.username},${user.created_at},${user.last_connection})`, (err) => {
                if(err) reject(true);
                resolve(false);
            })
        })
    }

    public async getUser(token: number): Promise<UserInterface | null> { // get a user from the database
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM user WHERE token=${token}`, (err, row) => {
                if(err) reject(null);
                else resolve(row);
            })
        })
    }

    public async deleteUser(token: number): Promise<boolean> { // delete a user from the database
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM user WHERE token=${token}`, (err) => {
                if(err) reject(true);
                resolve(false);
            })
        })
    }

    public async updateUser(token: number, user: UserInterface): Promise<boolean> { // update a user in the database
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE user SET name=${user.username} WHERE token=${token}`, (err) => {
                if(err) reject(false);
                resolve(true);
            })
        })
    }
}