import { Main } from "../app";
import axios, { AxiosError } from "axios";
import * as assert from "assert";
const model = require('../../models')
new Main();
const name = 'Matheo'
const secondName = 'Matheo2'
const shortName = 'Ma'
const longName = 'itsreallylongnamewithmortthanthirtyletters'
const email = 'matheo@gmail.com'
const secondEmail = 'matheo2@gmail.com'
const emailWithoutAt = 'matheogmail.com'
const emailWithoutDot = 'matheo@gmailcom'
const password = 'password12'
const shortPassword = 'short77'
const serverUrl = `http://127.0.0.1:3000`;
describe("test register and login", function () {
    before(async function () {
        await model.User.destroy({ truncate: true })
    })
    afterEach(async function () {
        await model.User.destroy({ truncate: true })
    })
    it("should create a user, then get it", async function () {
        const userRegister = await axios.post(
            `${serverUrl}/register`,
            {
                name,
                email,
                password
            }
        );
        assert.equal(201, userRegister.status)
        assert.equal(Object.keys(userRegister.data).includes('name'), true)
        assert.equal(Object.keys(userRegister.data).includes('email'), true)
        assert.equal(Object.keys(userRegister.data).includes('password'), false)
        assert.equal(userRegister.data.name, name)
        assert.equal(userRegister.data.email, email)

        const userLogin = await axios.post(
            `${serverUrl}/login`,
            {
                email,
                password
            }
        );
        assert.equal(200, userLogin.status)
        assert.equal(Object.keys(userLogin.data).includes('name'), true)
        assert.equal(userLogin.data.name, name)
    });

    it("should create a user, then create an other with same email and fail", async function () {
        const userRegister = await axios.post(
            `${serverUrl}/register`,
            {
                name,
                email,
                password
            }
        );
        assert.equal(201, userRegister.status)
        try {
            await axios.post(
                `${serverUrl}/register`,
                {
                    name,
                    email: secondEmail,
                    password
                }
            );
        }
        catch (e) {
            const error = e as AxiosError
            if (error.response) {
                assert.equal(error.response.data.code, 409)
            }

        }
    });
    it("should create a user, then try to create an other with same name and fail", async function () {
        const userRegister = await axios.post(
            `${serverUrl}/register`,
            {
                name,
                email,
                password
            }
        );
        assert.equal(201, userRegister.status)
        try {
            await axios.post(
                `${serverUrl}/register`,
                {
                    name: secondName,
                    email,
                    password
                }
            );
        }
        catch (e) {
            const error = e as AxiosError
            if (error.response) {
                assert.equal(error.response.data.code, 409)
            }
        }
    });

    it("should try to create a user with a too short password", async function () {
        try {
            await axios.post(
                `${serverUrl}/register`,
                {
                    name,
                    email,
                    password: shortPassword
                }
            );
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                assert.equal(error.response.data.code, 400)
            }
        }
    });

    it("should try to create a user with a too short name", async function () {
        try {
            await axios.post(
                `${serverUrl}/register`,
                {
                    name: shortName,
                    email,
                    password
                }
            );
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                assert.equal(error.response.data.code, 400)
            }
        }
    });
    it("should try to create a user with a too long name", async function () {
        try {
            await axios.post(
                `${serverUrl}/register`,
                {
                    name: longName,
                    email,
                    password
                }
            );
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                assert.equal(error.response.data.code, 400)
            }
        }
    });
    it("should try to create a user with an email without at", async function () {
        try {
            await axios.post(
                `${serverUrl}/register`,
                {
                    name,
                    email: emailWithoutAt,
                    password
                }
            );
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                assert.equal(error.response.data.code, 400)
            }
        }
    });

    it("should try to create a user with an email without dot", async function () {
        try {
            await axios.post(
                `${serverUrl}/register`,
                {
                    name,
                    email: emailWithoutDot,
                    password
                }
            );
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                assert.equal(error.response.data.code, 400)
            }
        }
    });
})