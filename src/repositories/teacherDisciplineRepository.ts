import client from "../dbStrategy/database";

export async function findTeacherDisciplineById(
  disciplineId: number,
  teacherId: number
) {
  return client.teachersDisciplines.findFirst({
    where: { disciplineId, teacherId },
  });
}
