import { UserInterface } from "../client/";
import { Database } from "sqlite3";

class UserDatabase { // user database class
    protected db: Database;

    constructor(database: Database){
        this.db = database
    }

    public generateUserTag(): number { // generate a random tag for the user (NEEDS AN UPDATE)
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

    public async getUser(username: string | number): Promise<boolean> { // check if a user exists in the database
        return new Promise((resolve, reject) => {
            if (typeof username === "number") {
                this.db.get(`SELECT * FROM users WHERE tag=${username}`, (err, row) => {
                    if(err) resolve(false);
                    if(row) resolve(true);
                })
            } else {
                this.db.get(`SELECT * FROM users WHERE username="${username}"`, (err, row) => {
                    if (err) reject();
                    if(row == undefined) resolve(false);
                    if(row) resolve(true);
                })
            }
        })
    }

    public async getUserByToken(token: number): Promise<UserInterface | null> { // get a user from the database
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
            this.db.run(`UPDATE users SET username=${user.username} WHERE token=${token}`, (err) => {
                if(err) reject(false);
                resolve(true);
            })
        })
    }
}

export default UserDatabase