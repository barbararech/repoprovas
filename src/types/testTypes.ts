import { Tests } from "@prisma/client";

export type INewTestData = Omit<Tests, "id">;

export type INewTest = Omit<Tests, "id" | "teacherDisciplineId"> & {
  disciplineId: number;
  teacherId: number;
};
