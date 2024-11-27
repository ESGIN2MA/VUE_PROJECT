export type Role = 'admin' | 'connected';

export interface User {
	email: string;
	username: string;
	password: string;
	roles: Role[];
}
