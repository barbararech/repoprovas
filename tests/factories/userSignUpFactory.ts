import { faker } from "@faker-js/faker";

export default async function userSignUpFactory() {
  const randomPassword = faker.random.alphaNumeric(10);
  return {
    email: faker.internet.email(),
    password: randomPassword,
    confirmPassword: randomPassword,
  };
}
