export interface UserInterface { // This is the interface for the user in the database
    token?: number;
    username: string;
    password: string;
    updated_at: string;
    created_at: string;
    last_connection: string;
}