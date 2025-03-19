import { UserID, User, DataStore, CreateUserReturn } from "../../types";
import { getData } from "../../dataStore";
import validator = require('validator');
import isEmail from "validator/lib/isEmail";
import { containsInvalidCharacters, hasLetter, hasNumber } from "../helper";


export function create_user(email: string, password: string,
                            firstName: string, lastName: string):CreateUserReturn {
    const data: DataStore = getData();

    if(!isEmail(email)) {
        return { error: 'Email is invalid' };
    }

    const usedEmail = data.users.find((user) => email == user.email);
    if (usedEmail) {
        return { error: 'Email is already in use' };
    }

    if (password.length > 20) {
        return { error: 'Password is too long' };
    }

    if (password.length < 8)  {
        throw new Error('Password is too short');
    }

    if (!hasLetter(password)) {
        throw new Error('Password does not have any letters');
    }

    if (!hasNumber(password)) {
        throw new Error('Password does not have any numbers');
    }

    if (firstName.length > 20) {
        throw new Error('firstName is too long');
    }

    if (firstName.length < 2) {
        throw new Error ('firstName is too short');
    }

    if (containsInvalidCharacters(firstName)) {
        throw new Error('firstName contains invalid characters');
    }

    if (lastName.length > 20) {
        throw new Error('lastName is too long');
    }

    if (lastName.length < 2) {
        throw new Error ('lastName is too short');
    }

    if (containsInvalidCharacters(lastName)) {
        throw new Error('lastName contains invalid characters');
    }

    const userID = Date.now() + Math.floor(Math.random() * 1000);

    data.users.push({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        userID: userID
    });

return {userID: userID};
}