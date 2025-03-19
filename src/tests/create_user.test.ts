import { getData } from "../../dataStore";
import { clear } from "../implementation/clear";
import { create_user } from "../implementation/create_user";
/* 
email not unique
email is invalid

password too long (more than 20)
password too short (less than 8)
password not strong enough
    no number, no letter

firstname too short (less than 2)
firstname too long (more than 20)
first name not alphabet

lastname too short (less than 2)
lastname too long (more than 20)
last name not alphabet
 */

describe("Tests for create_user", () => {
    let email: string;
    let password: string;
    let firstName: string;
    let lastName: string;

    beforeEach(() => {
        clear();
        email = 'test123@gmail.com';
        password = 'Testpassword123!';
        firstName = 'Jane';
        lastName = 'Doe';
    });

    describe("Error Cases: Email Errors", () => {
        test("Case 1: Invalid Email", () => {
            const errorCheck = create_user('invalidemail', password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String )});
        });

        test("Case 2 Email already taken: ", () => {
            create_user(email, password, firstName, lastName);
            const errorCheck = create_user(email, 'testPassword456', 'John', 'Doe');

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });
    });

    describe("Error Cases: Password Errors", () => {
        test("Password too long", () => {
            password = "thisisasuperduperlongpasswordthatwontwork1"
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });

        test("Password too short", () => {
            password = "Shrt1"
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });

        test("Password has no number", () => {
            password = "Nonumbers"
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });

        test("Password has no letter", () => {
            password = "12345678"
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });
    });

    describe("Error Cases: FirstName Errors", () => {
        test("Firstname too long", () => {
            firstName = 'superlongnamethatwontworkdefinitely'
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });

        test("Firstname too short", () => {
            firstName = 'hi'
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });

        test("Firstname not alphabet", () => {
            firstName = '123!'
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });
    });

    describe("Error Cases: LastName Errors", () => {
        test("Lastname too long", () => {
            firstName = 'superlongnamethatwontworkdefinitely'
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });

        test("Lastname too short", () => {
            firstName = 'hi'
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });

        test("Lastname not alphabet", () => {
            firstName = '123!'
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(errorCheck).toStrictEqual({ error: expect.any(String) });
        });
    });

    describe("Success Cases:", () => {
        test("Added User Successfully", () => {
            const data = getData();
            const sampleUser = {
                userID: expect.any(Number),
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            };
            const errorCheck = create_user(email, password, firstName, lastName);

            expect(data.users).toStrictEqual({sampleUser});
            expect(errorCheck).toStrictEqual(expect.any(Number));
        });
    })
})
