import * as disciplineRepository from "../repositories/disciplineRepository";

export async function findDisciplineById(disciplineId: number) {
  const discipline = await disciplineRepository.findDisciplineById(
    disciplineId
  );

  if (!discipline) {
    throw { status: 404, message: "This discipline isn't registered!" };
  }

  return;
}
