import client from "../dbStrategy/database";
import { INewTestData } from "../types/testTypes";

export async function insertNewTest(test: INewTestData) {
  return client.tests.create({
    data: test,
  });
}

export async function groupTestsByDiscipline() {
  return await client.terms.findMany({
    select:{
      number: true,
      disciplines:{
          select:{
              name: true,
              teachersDisciplines: {
              select:{
                      tests:{distinct:['categoryId'],
                     select:{
                         category:{
                             select:{
                                 name:true,
                                 tests:{
                                  select:{
                                      id: true,
                                      name: true,
                                      pdfUrl: true,
                                      teacherDiscipline:{
                                          select:{teacher:{select:{name:true}}},
                                      }
                                  }
                                 }
                              
                             }
                         }
                     }
                      }
                  }
              }
          }
      }
  }
})
}

// export async function groupTestsByTeacher() {
//   return await client.teachers.findMany({
//     select: {
//       name: true,
//       teachersDisciplines: {
//         select: {
//           discipline: {
//             select: {
//               name: true,
//             },
//           },
//           tests: {
//             select: {
//               name: true,
//               pdfUrl: true,
//               category: {
//                 select: {
//                   name: true,
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });
// }

export async function groupTestsByTeacher() {
  return await client.teachers.findMany({
    select: {
      name: true,
      teachersDisciplines: {
        select: {
          tests: {
            distinct: ["categoryId"],
            select: {
              category: {
                select: {
                  name: true,
                  tests: {
                    select: {
                      name: true,
                      teacherDiscipline:{
                        select:{
                          discipline:{
                            select: {
                              name: true
                            }
                          }
                        }
                      }
                    },
                  },
                },
              },
            },
            orderBy: [{ category: { name: "desc" } }],
          },
        },
      },
    },
  });
}

// export async function groupTestsByTeacher() {
//   return await client.teachers.findMany({
//     select: {id: true, name: true,
//       categories: { select: {
//           category: {select: {id: true, name: true,}},
//           tests: {select: {id: true, name: true, pdfUrl: true,
//               discipline: {select: {name: true}}
//           }}
//       }}
//   }
// });
// }

// export async function groupTestsByTeacher() {
//   return await client.categories.findMany({
//       select: {
//         id: true,
//         name: true,
//         tests: {
//           include: {
//             teacherDiscipline:{
//               include:{
//                 teacher:true
//               }
//             },
//           }
//         }

//       },

//     }
//   )
// }