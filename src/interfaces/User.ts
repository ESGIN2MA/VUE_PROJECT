export enum Role {
	ADMIN,
	USER,
}

export interface IUser {
	email: string;
	username: string;
	password: string;
	role: Role;
	isConnected: boolean;
}

// Classe User qui permet d'assigner un rôle par défaut
export class User implements IUser {
	email: string;
	username: string;
	password: string;
	role: Role;
	isConnected: boolean;

	constructor(email: string, username: string, password: string, role: Role = Role.USER) {
		this.email = email;
		this.username = username;
		this.password = password;
		this.role = role;
		this.isConnected = false;
	}
}
