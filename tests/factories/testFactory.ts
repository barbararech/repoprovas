import { faker } from "@faker-js/faker";

export default async function testFactory() {
  return {
    name: faker.name.fullName(),
    pdfUrl: faker.internet.url(),
    categoryId: faker.random.numeric(),
    disciplineId: faker.random.numeric(),
    teacherId: faker.random.numeric()
  };
}