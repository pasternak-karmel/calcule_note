// "use client";

// import React, { useState } from "react";
// import { useCourses } from "@/hooks/useCourses";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Plus, Trash2, Edit2, Save, X, Loader2 } from "lucide-react";
// import { CourseWithUE } from "@/db/schema";

// export default function ClasseId() {
//   const [editingCourse, setEditingCourse] = useState<CourseWithUE | null>(null);
  
//   const {
//     courses,
//     isLoading,
//     isError,
//     addCourse,
//     updateCourse,
//     deleteCourse,
//     isAddingCourse,
//     isUpdatingCourse,
//     isDeletingCourse,
//   } = useCourses();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-500">
//         Error loading courses. Please try again later.
//       </div>
//     );
//   }

//   const handleAddCourse = (semesterId: string) => {
//     const newCourse = {
//       codeUE: "",
//       codeEC: "",
//       contenu: "",
//       enseignement: "",
//       cours: 0,
//       tpTd: 0,
//       sp: 0,
//       tpe: 0,
//       ctt: 0,
//       cect: 0,
//       cc: false,
//       et: false,
//       ccEt: false,
//       professor: "",
//       classId,
//     };

//     addCourse({ semesterId, courseData: newCourse });
//   };

//   const handleSaveCourse = async () => {
//     if (!editingCourse) return;

//     await updateCourse({
//       courseId: editingCourse.id,
//       courseData: editingCourse,
//     });

//     setEditingCourse(null);
//   };

//   const handleDeleteCourse = async (courseId: string) => {
//     await deleteCourse(courseId);
//   };

//   return (
//     <>
    
//     </>
//   );
// }

"use client";

import React, { useState } from "react";
import { useCourses } from "@/hooks/useCourses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit2, Save, X, Loader2 } from "lucide-react";
import { CourseWithUE } from "@/db/schema";

export default function ClasseId() {
  const [editingCourse, setEditingCourse] = useState<CourseWithUE | null>(null);
  const [newCourse, setNewCourse] = useState<CourseWithUE>({
    id: "",
    codeUE: "",
    codeEC: "",
    contenu: "",
    enseignement: "",
    cours: 0,
    tpTd: 0,
    sp: 0,
    tpe: 0,
    ctt: 0,
    cect: 0,
    cc: false,
    et: false,
    ccEt: false,
    professor: "",
  });

  const {
    courses,
    isLoading,
    isError,
    addCourse,
    updateCourse,
    deleteCourse,
    isAddingCourse,
    isUpdatingCourse,
    isDeletingCourse,
  } = useCourses();

  const handleAddCourse = (semesterId: string) => {
    addCourse({ semesterId, courseData: newCourse });
    setNewCourse({
      id: "",
      codeUE: "",
      codeEC: "",
      contenu: "",
      enseignement: "",
      cours: 0,
      tpTd: 0,
      sp: 0,
      tpe: 0,
      ctt: 0,
      cect: 0,
      cc: false,
      et: false,
      ccEt: false,
      professor: "",
    });
  };

  const handleSaveCourse = async () => {
    if (!editingCourse) return;

    await updateCourse({
      courseId: editingCourse.id,
      courseData: editingCourse,
    });
    setEditingCourse(null);
  };

  const handleDeleteCourse = async (courseId: string) => {
    await deleteCourse(courseId);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error loading courses. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="allCourses">
        <TabsList>
          {courses.map((semester) => (
            <TabsTrigger key={semester.id} value={semester.id}>
              {semester.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {courses.map((semester) => (
          <TabsContent key={semester.id} value={semester.id}>
            <div className="mb-4">
              <Button
                onClick={() => handleAddCourse(semester.id)}
                disabled={isAddingCourse}
              >
                {isAddingCourse ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                Add Course
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code UE</TableHead>
                  <TableHead>Code EC</TableHead>
                  <TableHead>Contenu</TableHead>
                  <TableHead>Enseignement</TableHead>
                  <TableHead>Professor</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {semester.courses.map((course) => (
                  <TableRow key={course.id}>
                    {editingCourse && editingCourse.id === course.id ? (
                      <>
                        <TableCell>
                          <Input
                            value={editingCourse.codeUE}
                            onChange={(e) =>
                              setEditingCourse((prev) =>
                                prev ? { ...prev, codeUE: e.target.value } : null
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingCourse.codeEC}
                            onChange={(e) =>
                              setEditingCourse((prev) =>
                                prev ? { ...prev, codeEC: e.target.value } : null
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingCourse.contenu}
                            onChange={(e) =>
                              setEditingCourse((prev) =>
                                prev ? { ...prev, contenu: e.target.value } : null
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingCourse.enseignement}
                            onChange={(e) =>
                              setEditingCourse((prev) =>
                                prev ? { ...prev, enseignement: e.target.value } : null
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingCourse.professor}
                            onChange={(e) =>
                              setEditingCourse((prev) =>
                                prev ? { ...prev, professor: e.target.value } : null
                              )
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button onClick={handleSaveCourse} className="mr-2">
                            <Save className="mr-2 h-4 w-4" /> Save
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => setEditingCourse(null)}
                          >
                            <X className="mr-2 h-4 w-4" /> Cancel
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{course.codeUE}</TableCell>
                        <TableCell>{course.codeEC}</TableCell>
                        <TableCell>{course.contenu}</TableCell>
                        <TableCell>{course.enseignement}</TableCell>
                        <TableCell>{course.professor}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => setEditingCourse(course)}
                            className="mr-2"
                          >
                            <Edit2 className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteCourse(course.id)}
                            disabled={isDeletingCourse}
                          >
                            {isDeletingCourse ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="mr-2 h-4 w-4" />
                            )}
                            Delete
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
