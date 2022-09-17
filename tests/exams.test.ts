import supertest from "supertest";
import app from "../src/app";
import client from "../src/dbStrategy/database";
import userSignUpFactory from "./factories/userSignUpFactory";
import testFactory from "./factories/testFactory";
import { faker } from "@faker-js/faker";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "tests" RESTART IDENTITY CASCADE`;
});

describe("Test POST /tests", () => {
  it("Should return 201 if creating exam correctly", async () => {
    const user = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(user);

    const userLogin = { email: user.email, password: user.password };
    const response = await supertest(app).post(`/signin`).send(userLogin);
    const { token } = response.body;
   
    const test = await testFactory();
    const result = await supertest(app)
      .post(`/tests`)
      .send(test)
      .auth(token, { type: 'bearer' })

    expect(result.status).toBe(201);
    expect(result).not.toBeNull();
  });

  it("Should return 500 if send invalid token", async () => {
    const user = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(user);

    const userLogin = { email: user.email, password: user.password };
    const response = await supertest(app).post(`/signin`).send(userLogin);
    let { token } = response.body;
    token = token + "a";

    const test = await testFactory();
    const result = await supertest(app)
      .post(`/tests`)
      .send(test)
      .auth(token, { type: 'bearer' })

    expect(result.status).toBe(500);
  });

  it("Should return 422 if send exam without name", async () => {
    const user = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(user);

    const userLogin = { email: user.email, password: user.password };
    const response = await supertest(app).post(`/signin`).send(userLogin);
    const { token } = response.body;

    const test = await testFactory();
    test.name = "";
    const result = await supertest(app)
      .post(`/tests`)
      .send(test)
      .auth(token, { type: 'bearer' })

    expect(result.status).toBe(422);
  });

  it("Should return 422 if send exam without pdfUrl", async () => {
    const user = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(user);

    const userLogin = { email: user.email, password: user.password };
    const response = await supertest(app).post(`/signin`).send(userLogin);
    const { token } = response.body;

    const test = await testFactory();
    test.pdfUrl = "";
    const result = await supertest(app)
      .post(`/tests`)
      .send(test)
      .auth(token, { type: 'bearer' })

    expect(result.status).toBe(422);
  });

  it("Should return 422 if send exam with invalid categoryId", async () => {
    const user = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(user);

    const userLogin = { email: user.email, password: user.password };
    const response = await supertest(app).post(`/signin`).send(userLogin);
    const { token } = response.body;

    const test = await testFactory();
    test.categoryId = Number(faker.random.numeric(8));

    const result = await supertest(app)
      .post(`/tests`)
      .send(test)
      .auth(token, { type: 'bearer' })

    expect(result.status).toBe(404);
  });

  it("Should return 422 if send exam with invalid disciplineId", async () => {
    const user = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(user);

    const userLogin = { email: user.email, password: user.password };
    const response = await supertest(app).post(`/signin`).send(userLogin);
    const { token } = response.body;

    const test = await testFactory();
    test.disciplineId = Number(faker.random.numeric(8));

    const result = await supertest(app)
      .post(`/tests`)
      .send(test)
      .auth(token, { type: 'bearer' })

    expect(result.status).toBe(404);
  });

  it("Should return 422 if send exam with invalid teacherId", async () => {
    const user = await userSignUpFactory();
    await supertest(app).post(`/signup`).send(user);

    const userLogin = { email: user.email, password: user.password };
    const response = await supertest(app).post(`/signin`).send(userLogin);
    const { token } = response.body;

    const test = await testFactory();
    test.teacherId = Number(faker.random.numeric(8));

    const result = await supertest(app)
      .post(`/tests`)
      .send(test)
      .auth(token, { type: 'bearer' })

    expect(result.status).toBe(404);
  });
});

afterAll(async () => {
  await client.$disconnect();
});
