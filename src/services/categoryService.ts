import * as categoryRepository from "../repositories/categoryRepository";

export async function findCategoryById(categoryId: number) {
  const category = await categoryRepository.findCategoryById(categoryId);

  if (!category) {
    throw { status: 404, message: "This category isn't registered!" };
  }

  return;
}
