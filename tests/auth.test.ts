import supertest from "supertest";
import app from "../src/app";
import client from "../src/dbStrategy/database";
import userSignUpFactory from "./factories/userSignUpFactory";
import userSignInFactory from "./factories/userSignInFactory";
import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "users"`;
});

describe("Test POST /signup", () => {
  it("Should return 201 if registered an user in the correct format", async () => {
    const user = await userSignUpFactory();

    const result = await supertest(app).post(`/signup`).send(user);

    const createdUser = await client.users.findFirst({
      where: { email: user.email },
    });

    expect(result.status).toBe(201);
    expect(createdUser).toBeInstanceOf(Object);
  });

  it("Should return 409 if registered a user that already exists", async () => {
    const user = await userSignUpFactory();

    await supertest(app).post(`/signup`).send(user);
    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(409);
  });

  it("Should return 422 if registered a user without email", async () => {
    const user = await userSignUpFactory();
    user.email = "";

    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(422);
  });

  it("Should return 422 if registered a user without password", async () => {
    const user = await userSignUpFactory();
    user.password = "";

    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(422);
  });

  it("Should return 422 if registered a user with no match between password and password confirmation", async () => {
    const user = await userSignUpFactory();
    user.confirmPassword = "";

    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(422);
  });
});

describe("Test POST /signin", () => {
  it("Should return 200 if the user sign in correctly", async () => {
    const registeredUser = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(registeredUser);

    const user = await userSignInFactory(
      registeredUser.email,
      registeredUser.password
    );

    const result = await supertest(app).post(`/signin`).send(user);
    const { token } = result.body;

    expect(result.status).toBe(200);
    expect(token).not.toBeNull();
  });

  it("Should return 401 if user sign in with incorrect email", async () => {
    const registeredUser = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(registeredUser);
    const email = faker.internet.email(); 

    const user = await userSignInFactory(
      email,
      registeredUser.password
    );

    const result = await supertest(app).post(`/signin`).send(user);

    expect(result.status).toBe(401);
  });

  it("Should return 401 if user sign in with incorrect password", async () => {
    const registeredUser = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(registeredUser);
    const password = faker.random.alphaNumeric(10); 

    const user = await userSignInFactory(
      registeredUser.email,
      password
    );

    const result = await supertest(app).post(`/signin`).send(user);

    expect(result.status).toBe(401);
  });

  it("Should return 422 if user sign in without email", async () => {
    const registeredUser = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(registeredUser);
    const email = '';
    const user = await userSignInFactory(
      email,
      registeredUser.password
    );

    const result = await supertest(app).post(`/signin`).send(user);

    expect(result.status).toBe(422);
  });

  it("Should return 422 if user sign in without password", async () => {
    const registeredUser = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(registeredUser);
    const password = '';

    const user = await userSignInFactory(
      registeredUser.email,
      password
    );

    const result = await supertest(app).post(`/signin`).send(user);

    expect(result.status).toBe(422);
  });
});

afterAll(async () => {
  await client.$disconnect();
});
