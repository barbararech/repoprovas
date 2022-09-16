import client from "../dbStrategy/database";

export async function findTeacherById(id: number) {
  return client.teachers.findFirst({
    where: { id },
  });
}
