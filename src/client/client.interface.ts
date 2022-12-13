export interface UserInterface { // This is the interface for the user in the database
    token: number;
    username: string;
    created_at: Date;
    last_connection: Date;
}