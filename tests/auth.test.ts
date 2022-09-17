import supertest from "supertest";
import app from "../src/app";
import client from "../src/dbStrategy/database";
import userSignUpFactory from "./factories/userSignUpFactory";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "tests"`;
});

describe("Test POST /signup", () => {
  it("Should return 201, if registered an user in the correct format", async () => {
    const user = await userSignUpFactory();

    const result = await supertest(app).post(`/signup`).send(user);

    const createdUser = await client.users.findFirst({
      where: { email: user.email },
    });

    expect(result.status).toBe(201);
    expect(createdUser).not.toBeNull();
  });

  it("Should return 409, if registered a user that already exists", async () => {
    const user = await userSignUpFactory();

    await supertest(app).post(`/signup`).send(user);
    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(409);
  });

  it("Should return 422, if registered a user without email", async () => {
    const user = await userSignUpFactory();
    user.email = "";

    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(422);
  });

  it("Should return 422, if registered a user without password", async () => {
    const user = await userSignUpFactory();
    user.password = "";

    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(422);
  });

  it("Should return 422, if registered a user with no match between password and password confirmation", async () => {
    const user = await userSignUpFactory();
    user.confirmPassword = "12d";

    const result = await supertest(app).post(`/signup`).send(user);

    expect(result.status).toBe(422);
  });
});

afterAll(async () => {
  await client.$disconnect();
});
