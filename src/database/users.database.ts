import { UserInterface } from "../client/";
import { Database } from "sqlite3";

import DB from "./"

export class UserDatabase {
    protected db: Database = DB.getDB();

    public generateUserTag(): number {
        return Math.floor(1000 + Math.random() * 9000);
    } 

    public async createUser(user: UserInterface): Promise<boolean | string> { // create a user in the database
        return new Promise((resolve, reject) => {
            this.db.exec(`INSERT INTO users(username, tag, password, created_at, updated_at, last_connection) VALUES("${user.username}","${this.generateUserTag()}","${user.password}","${user.created_at}","${user.updated_at}","${user.last_connection}")`, (err) => {
                if(err) reject(err);
                resolve(false);
            })
        })
    }

    public async getUsers(): Promise<UserInterface[] | null> { // get all the users from the database
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM users`, (err, rows) => {
                if(err) reject(null);
                else resolve(rows);
            })
        })
    }

    public async getUser(token: number): Promise<UserInterface | null> { // get a user from the database
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT * FROM users WHERE token=${token}`, (err, row) => {
                if(err) reject(null);
                else resolve(row);
            })
        })
    }

    public async deleteUser(token: number): Promise<boolean> { // delete a user from the database
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM users WHERE token=${token}`, (err) => {
                if(err) reject(true);
                resolve(false);
            })
        })
    }

    public async updateUser(token: number, user: UserInterface): Promise<boolean> { // update a user in the database
        return new Promise((resolve, reject) => {
            this.db.run(`UPDATE users SET name=${user.username} WHERE token=${token}`, (err) => {
                if(err) reject(false);
                resolve(true);
            })
        })
    }
}