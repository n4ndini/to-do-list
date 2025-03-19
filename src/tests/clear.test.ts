import test from "node:test";
import { clear } from "../implementation/clear";
import { create_user } from "../implementation/create_user";
import { DataStore } from "../../types";
import { getData } from "../../dataStore";

describe("Tests for clear", () => {
    let data: DataStore;
    beforeEach(() => {
        data = getData();
        const email: string = 'test123@gmail.com';
        const password: string = 'testPassword123!';
        const username: string = 'testUser';
        const firstName: string = 'Jane';
        const lastName: string = 'Doe';

        create_user(email, password, firstName, lastName);
    });

    describe("Success Case", () => {
        test("Success Case: Cleared successfully", () => {
            clear();
            expect(data).toStrictEqual({});
        });

    });
});