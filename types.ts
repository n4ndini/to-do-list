// Interfaces
export interface UserID {
    userID: number;
}

export interface User {
    userID: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface DataStore {
    users: User[];
}

export interface Error {
    error: string;
}

// Return Types
export type CreateUserReturn = Error | UserID