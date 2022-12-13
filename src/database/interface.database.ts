import { Database } from "sqlite3";
import { UserInterface } from "../client";

export interface DatabaseInterface { // This is the interface for the database
    getDB(): Database;
    closeDB(): void;
    insert(table_name: string, table_properties: Object): void;
    createTable(table_name: string, table_properties: Object): void;
    createTableFromConfig(): void;
    createUser(user: UserInterface) : Promise<boolean>;
    getUser(token: number) : Promise<UserInterface | null>;
    deleteUser(token: number) : Promise<boolean>;
    updateUser(token: number, user: UserInterface) : Promise<boolean>;
}

export interface I_Database_Column { // Database Interface for the columns
    name: string;
    type: string;
    primary?: boolean;
    autoincrement?: boolean;
    length?: number;
    foreign?: string;
}

export interface I_Database_Table { // Database Interface for the tables
    table_name: string;
    columns: I_Database_Column[];
}

