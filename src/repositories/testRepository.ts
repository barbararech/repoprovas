import client from "../dbStrategy/database";
import { INewTestData } from "../types/testTypes";

export async function insertNewTest(test: INewTestData) {
  return client.tests.create({
    data: test,
  });
}

export async function groupTestsByDiscipline() {
  return await client.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
        },
      },
    },
  });
}
