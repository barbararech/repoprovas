import { faker } from "@faker-js/faker";

export default async function testFactory() {
  return {
    name: faker.name.fullName(),
    pdfUrl: faker.internet.url(),
    categoryId: 1,
    disciplineId: 1,
    teacherId: 1
  };
}