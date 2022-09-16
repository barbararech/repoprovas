import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository";

export async function findTeachersDisciplinesById(disciplineId: number, teacherId:number) {
  const teacherDiscipline =
    await teacherDisciplineRepository.findTeacherDisciplineById(disciplineId, teacherId);

  if (!teacherDiscipline) {
    throw {
      status: 404,
      message: "This teacher does not teach this subject!",
    };
  }

  return teacherDiscipline;
}
