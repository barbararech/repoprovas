import client from "../dbStrategy/database";

export async function findCategoryById(id: number) {
  return client.categories.findFirst({
    where: { id },
  });
}
