import client from "../dbStrategy/database";

export async function findDisciplineById(id: number) {
  return client.disciplines.findFirst({
    where: { id },
  });
}
