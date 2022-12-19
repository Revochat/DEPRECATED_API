export interface UserInterface { // This is the interface for the user in the database
    token: string;
    username: string;
    password: string;
    updated_at: string;
    created_at: string;
    last_connection: string;
}

export interface UserConnect {
    token: string;
    username: string;
    created_at: string;
    updated_at: string;
    last_connection: string;
}