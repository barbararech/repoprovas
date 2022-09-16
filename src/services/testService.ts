import * as testRepository from "../repositories/testRepository";
import * as categoryService from "../services/categoryService";
import * as teachersDisciplinesService from "../services/teachersDisciplinesService";
import * as disciplineService from "../services/disciplineService";
import * as teacherService from "../services/teacherService";
import { INewTest } from "../types/testTypes";

export async function newTest(test: INewTest) {
  const { name, pdfUrl, categoryId, disciplineId, teacherId } = test;

  await categoryService.findCategoryById(categoryId);

  await disciplineService.findDisciplineById(disciplineId);

  await teacherService.findTeacherById(teacherId);

  const teacherDiscipline =
    await teachersDisciplinesService.findTeachersDisciplinesById(
      disciplineId,
      teacherId
    );

  const testData = {
    name,
    pdfUrl,
    categoryId,
    teacherDisciplineId: teacherDiscipline.id,
  };

  const registeredTest = await testRepository.insertNewTest(testData);

  return registeredTest;
}


export async function getTestsByDiscipline() {
  const tests =  await testRepository.groupTestsByDiscipline();
  return tests;
}