import { Database } from "sqlite3";
import { UserInterface } from "../../client";
import uuid from "uuid";

class UserDatabase { // user database class
    protected db: Database;

    constructor(database: Database){
        this.db = database
    }

    public generateUserToken(): string { // generate a random token for the user (NEEDS AN UPDATE)
        return "RVC_" + uuid.v4() + Math.floor(1000 + Math.random() * 9000);
    }

    public async createUser(user: UserInterface): Promise<boolean | string> { // create a user in the database
        return new Promise((resolve, reject) => {
            this.db.exec(`INSERT INTO users(username, password, created_at, updated_at, last_connection) VALUES("${user.username}","${user.password}","${user.created_at}","${user.updated_at}","${user.last_connection}")`, (err) => {
                if(err) reject(err);
                resolve(false);
            })
        })
    }

    public async getUser(username: string, password: string): Promise<boolean | UserInterface> { // check if a user exists in the database
        return new Promise((resolve, reject) => {
            if (!this.checkCredentials(username, password)) reject("Invalid credentials")
            this.db.get(`SELECT * FROM users WHERE username="${username}" LIMIT 1`, (err: Error | null, row: any) => {
                if (err) reject("Error while getting user");
                if(row == undefined) resolve(false);
                if(row) resolve(row);
            })
        })
    }

    public checkCredentials(username: string, password: string): boolean { // check if the password is correct
        if (username.length < 4 || password.length < 6) return false;
        return true;
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