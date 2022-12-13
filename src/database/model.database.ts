import { Database } from "sqlite3";
import { I_Database_Table } from "./interface.database"


const Config = require("../config/database.json");

export class DB_Modal { // This is the class for the database model (the database itself)
    protected db: Database;
    private db_name: string = Config.database_name ;
    constructor() {
        this.db = new Database(`${this.db_name}.db`);
        //Emitter.emit("databaseReady", `Database ${this.db_name} created`);
    }

    public getDB(): Database {
        return this.db;
    }

    public closeDB(): void {
        this.db.close();
    }

    public createTable(table_name: string, table_properties: Object): void {
        this.db.run(`CREATE TABLE IF NOT EXISTS ${table_name} (${table_properties})`);
        //Emitter.logSuccess(`Table ${table_name} created`);
    }

    public insert(table_name: string, table_properties: Object): void {
        this.db.run(`INSERT INTO ${table_name} (${table_properties})`);
    }

    public createTableFromConfig(): void {
        var properties: string;
        let table_name: string;
        Config.tables.forEach((table: I_Database_Table) => {
            properties = "";
            table.columns.forEach(column => {
                if(properties != undefined) {
                    if(column.name) properties += `${column.name}`;
                    if(column.type == "INTEGER" || column.type == "REAL" || column.type == "DATE") properties += ` ${column.type}`;
                    else if(column.type == "TEXT" && column.length) properties += ` VARCHAR(${column.length})`;
                    else properties += ` TEXT NOT NULL`;
                    if(column.primary) properties += ` PRIMARY KEY`;
                    if(column.autoincrement) properties += ` AUTOINCREMENT`;
                    properties += `, `;
                }
            })
            if(properties != undefined) properties = properties.slice(0, -2);
            this.createTable(table.table_name, properties);
        })
    }
}
