import { UserInterface } from "./client.interface";

export class User implements UserInterface{ // This is the class for the user in the database
	public token?: number; // Note that the `null assertion` `!` is required in strict mode.
	public username!: string; // for nullable fields
	public password!: string;
	public created_at!: string;
	public updated_at!: string;
	public last_connection!: string;

	constructor(data: UserInterface) {
		Object.assign(this, data);
	}
}