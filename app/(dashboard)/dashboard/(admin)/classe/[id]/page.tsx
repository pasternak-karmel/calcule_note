// "use client";
// import { useState } from "react";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useCourses } from "@/hooks/useCourses";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { CourseWithUE } from "@/db/schema";
// import { Loader2 } from "lucide-react";

// export default function CourseManagement() {
//   const { courses, isLoading, isError, updateCourse } = useCourses();
//   const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
//   const [editedCourses, setEditedCourses] = useState<{
//     [key: string]: CourseWithUE;
//   }>({});
//   const [hasChanges, setHasChanges] = useState(false);

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
//   if (courses.length === 0)
//     return <div>No semesters found. Please run the setup script.</div>;

//   const handleSemesterChange = (semesterId: string) => {
//     setSelectedSemester(semesterId);
//     setEditedCourses({});
//     setHasChanges(false);
//   };

//   const handleCourseChange = (
//     courseId: string,
//     field: keyof CourseWithUE,
//     value: unknown
//   ) => {
//     setEditedCourses((prev) => ({
//       ...prev,
//       [courseId]: {
//         ...prev[courseId],
//         [field]: value,
//       },
//     }));
//     setHasChanges(true);
//   };

//   const saveChanges = async () => {
//     for (const [courseId, courseData] of Object.entries(editedCourses)) {
//       updateCourse({ courseId, courseData });
//     }
//     setEditedCourses({});
//     setHasChanges(false);
//     toast.success("All changes saved successfully");
//   };

//   const currentSemester = courses.find((sem) => sem.id === selectedSemester);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Course Management</h1>

//       <Select onValueChange={handleSemesterChange}>
//         <SelectTrigger className="w-[200px] mb-4">
//           <SelectValue placeholder="Select Semester" />
//         </SelectTrigger>
//         <SelectContent>
//           {courses.map((semester) => (
//             <SelectItem key={semester.id} value={semester.id}>
//               {semester.name}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       {currentSemester && (
//         <div className="space-y-4">
//           {currentSemester.courses.map((course) => (
//             <Card key={course.id}>
//               <CardHeader>
//                 <CardTitle>{course.enseignement}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor={`codeUE-${course.id}`}>Code UE</Label>
//                     <Input
//                       id={`codeUE-${course.id}`}
//                       value={editedCourses[course.id]?.codeUE ?? course.codeUE}
//                       onChange={(e) =>
//                         handleCourseChange(course.id, "codeUE", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor={`codeEC-${course.id}`}>Code EC</Label>
//                     <Input
//                       id={`codeEC-${course.id}`}
//                       value={editedCourses[course.id]?.codeEC ?? course.codeEC}
//                       onChange={(e) =>
//                         handleCourseChange(course.id, "codeEC", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor={`contenu-${course.id}`}>Contenu</Label>
//                     <Input
//                       id={`contenu-${course.id}`}
//                       value={
//                         editedCourses[course.id]?.contenu ?? course.contenu
//                       }
//                       onChange={(e) =>
//                         handleCourseChange(course.id, "contenu", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor={`enseignement-${course.id}`}>
//                       Enseignement
//                     </Label>
//                     <Input
//                       id={`enseignement-${course.id}`}
//                       value={
//                         editedCourses[course.id]?.enseignement ??
//                         course.enseignement
//                       }
//                       onChange={(e) =>
//                         handleCourseChange(
//                           course.id,
//                           "enseignement",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor={`cours-${course.id}`}>Cours</Label>
//                     <Input
//                       id={`cours-${course.id}`}
//                       type="number"
//                       value={editedCourses[course.id]?.cours ?? course.cours}
//                       onChange={(e) =>
//                         handleCourseChange(
//                           course.id,
//                           "cours",
//                           parseInt(e.target.value)
//                         )
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor={`tpTd-${course.id}`}>TP/TD</Label>
//                     <Input
//                       id={`tpTd-${course.id}`}
//                       type="number"
//                       value={editedCourses[course.id]?.tpTd ?? course.tpTd}
//                       onChange={(e) =>
//                         handleCourseChange(
//                           course.id,
//                           "tpTd",
//                           parseInt(e.target.value)
//                         )
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor={`sp-${course.id}`}>SP</Label>
//                     <Input
//                       id={`sp-${course.id}`}
//                       type="number"
//                       value={editedCourses[course.id]?.sp ?? course.sp}
//                       onChange={(e) =>
//                         handleCourseChange(
//                           course.id,
//                           "sp",
//                           parseInt(e.target.value)
//                         )
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor={`tpe-${course.id}`}>TPE</Label>
//                     <Input
//                       id={`tpe-${course.id}`}
//                       type="number"
//                       value={editedCourses[course.id]?.tpe ?? course.tpe}
//                       onChange={(e) =>
//                         handleCourseChange(
//                           course.id,
//                           "tpe",
//                           parseInt(e.target.value)
//                         )
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor={`ctt-${course.id}`}>CTT</Label>
//                     <Input
//                       id={`ctt-${course.id}`}
//                       type="number"
//                       value={editedCourses[course.id]?.ctt ?? course.ctt}
//                       onChange={(e) =>
//                         handleCourseChange(
//                           course.id,
//                           "ctt",
//                           parseInt(e.target.value)
//                         )
//                       }
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor={`cect-${course.id}`}>CECT</Label>
//                     <Input
//                       id={`cect-${course.id}`}
//                       type="number"
//                       value={editedCourses[course.id]?.cect ?? course.cect}
//                       onChange={(e) =>
//                         handleCourseChange(
//                           course.id,
//                           "cect",
//                           parseInt(e.target.value)
//                         )
//                       }
//                     />
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Switch
//                       id={`cc-${course.id}`}
//                       checked={editedCourses[course.id]?.cc ?? course.cc}
//                       onCheckedChange={(checked) =>
//                         handleCourseChange(course.id, "cc", checked)
//                       }
//                     />
//                     <Label htmlFor={`cc-${course.id}`}>CC</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Switch
//                       id={`et-${course.id}`}
//                       checked={editedCourses[course.id]?.et ?? course.et}
//                       onCheckedChange={(checked) =>
//                         handleCourseChange(course.id, "et", checked)
//                       }
//                     />
//                     <Label htmlFor={`et-${course.id}`}>ET</Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Switch
//                       id={`ccEt-${course.id}`}
//                       checked={editedCourses[course.id]?.ccEt ?? course.ccEt}
//                       onCheckedChange={(checked) =>
//                         handleCourseChange(course.id, "ccEt", checked)
//                       }
//                     />
//                     <Label htmlFor={`ccEt-${course.id}`}>CC/ET</Label>
//                   </div>
//                   <div>
//                     <Label htmlFor={`professor-${course.id}`}>Professor</Label>
//                     <Input
//                       id={`professor-${course.id}`}
//                       value={
//                         editedCourses[course.id]?.professor ?? course.professor
//                       }
//                       onChange={(e) =>
//                         handleCourseChange(
//                           course.id,
//                           "professor",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {hasChanges && (
//         <Button className="mt-4" onClick={saveChanges}>
//           Save Changes
//         </Button>
//       )}
//     </div>
//   );
// }
"use client"

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Types pour notre structure de données
type EC = {
  codeEC: string
  enseignement: string
  cours: number
  tpTd: number
  sp: number
  tpe: number
}

type UE = {
  codeUE: string
  contenu: string
  ecs: EC[]
  ctt: number
  cect: number
  cc: boolean
  et: boolean
  ccEt: boolean
}

type Semester = {
  number: number
  ues: UE[]
  total: {
    ctt: number
    cect: number
  }
}

// Données des semestres
const semestersData: Semester[] = [
  {
    number: 5,
    ues: [
      {
        codeUE: "INF1521",
        contenu: "Infographie 2D et 3D",
        ecs: [
          { codeEC: "1INF1521", enseignement: "Infographie 2D et 3D", cours: 10, tpTd: 40, sp: 0, tpe: 50 }
        ],
        ctt: 100,
        cect: 4,
        cc: false,
        et: false,
        ccEt: true
      },
      {
        codeUE: "INF1522",
        contenu: "Technologies Immersives",
        ecs: [
          { codeEC: "1INF1522", enseignement: "Concepts des technologies immersives (RA, RV, RM, RX)", cours: 15, tpTd: 10, sp: 0, tpe: 25 },
          { codeEC: "2INF1522", enseignement: "Applications des technologies immersives", cours: 15, tpTd: 10, sp: 0, tpe: 50 }
        ],
        ctt: 125,
        cect: 5,
        cc: false,
        et: true,
        ccEt: false
      },
      {
        codeUE: "INF1523",
        contenu: "Veille technologique en Internet et Multimédia",
        ecs: [
          { codeEC: "1INF1523", enseignement: "Veille technologique en Internet et Multimédia", cours: 10, tpTd: 15, sp: 0, tpe: 75 }
        ],
        ctt: 100,
        cect: 4,
        cc: false,
        et: false,
        ccEt: true
      },
      {
        codeUE: "INF1524",
        contenu: "Hackathon en Internet et multimédia",
        ecs: [
          { codeEC: "1INF1524", enseignement: "Hackathon en Internet et multimédia", cours: 0, tpTd: 0, sp: 0, tpe: 100 }
        ],
        ctt: 100,
        cect: 4,
        cc: false,
        et: false,
        ccEt: true
      },
      {
        codeUE: "INF1525",
        contenu: "Formation à la certification en outils multimédia et Internet",
        ecs: [
          { codeEC: "1INF1525", enseignement: "Préparation à la certification UX/UI Design", cours: 0, tpTd: 0, sp: 0, tpe: 25 }
        ],
        ctt: 100,
        cect: 4,
        cc: false,
        et: false,
        ccEt: true
      },
      {
        codeUE: "INF1526",
        contenu: "Développement d'applications Mobiles",
        ecs: [
          { codeEC: "1INF1526", enseignement: "Développement d'applications Mobiles", cours: 10, tpTd: 15, sp: 0, tpe: 75 }
        ],
        ctt: 100,
        cect: 4,
        cc: false,
        et: false,
        ccEt: true
      },
      {
        codeUE: "CJO1527",
        contenu: "Communication",
        ecs: [
          { codeEC: "1CJO1527", enseignement: "Force de vente et communication digitale", cours: 5, tpTd: 10, sp: 0, tpe: 10 },
          { codeEC: "2CJO1527", enseignement: "Outils de rédaction de mémoire", cours: 10, tpTd: 15, sp: 0, tpe: 30 }
        ],
        ctt: 75,
        cect: 3,
        cc: false,
        et: true,
        ccEt: false
      },
      {
        codeUE: "TCC1528",
        contenu: "Techniques entrepreneuriales",
        ecs: [
          { codeEC: "1TCC1528", enseignement: "Techniques entrepreneuriales", cours: 10, tpTd: 10, sp: 0, tpe: 30 }
        ],
        ctt: 50,
        cect: 2,
        cc: false,
        et: true,
        ccEt: false
      }
    ],
    total: {
      ctt: 750,
      cect: 30
    }
  },
  {
    number: 6,
    ues: [
      {
        codeUE: "TCC1621",
        contenu: "Stage (12 semaines)",
        ecs: [
          { codeEC: "1TCC1621", enseignement: "Stage (12 semaines)", cours: 0, tpTd: 0, sp: 0, tpe: 0 }
        ],
        ctt: 425,
        cect: 17,
        cc: false,
        et: false,
        ccEt: true
      },
      {
        codeUE: "TCC1622",
        contenu: "Discipline",
        ecs: [
          { codeEC: "1TCC1622", enseignement: "Discipline", cours: 0, tpTd: 0, sp: 0, tpe: 0 }
        ],
        ctt: 25,
        cect: 1,
        cc: false,
        et: false,
        ccEt: true
      },
      {
        codeUE: "TCC1623",
        contenu: "Rédaction et soutenance de rapport ou de mémoire (4 semaines)",
        ecs: [
          { codeEC: "1TCC1623", enseignement: "Rédaction de mémoire ou de rapport", cours: 0, tpTd: 0, sp: 0, tpe: 0 },
          { codeEC: "2TCC1623", enseignement: "Pré-soutenance", cours: 0, tpTd: 0, sp: 0, tpe: 0 },
          { codeEC: "3TCC1623", enseignement: "Soutenance", cours: 0, tpTd: 0, sp: 0, tpe: 0 }
        ],
        ctt: 300,
        cect: 12,
        cc: false,
        et: false,
        ccEt: true
      }
    ],
    total: {
      ctt: 750,
      cect: 30
    }
  }
]

export default function SemestersTable() {
  return (
    <div className="space-y-8">
      {semestersData.map((semester) => (
        <Card key={semester.number}>
          <CardHeader>
            <CardTitle>{semester.number === 5 ? "Cinquième semestre" : "Sixième semestre"}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2}>Code UE</TableHead>
                  <TableHead rowSpan={2}>Contenu des enseignements</TableHead>
                  <TableHead rowSpan={2}>Code EC</TableHead>
                  <TableHead colSpan={5}>Enseignements</TableHead>
                  <TableHead rowSpan={2}>CTT</TableHead>
                  <TableHead rowSpan={2}>CECT</TableHead>
                  <TableHead colSpan={3}>Modalité d'évaluation</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead>UE</TableHead>
                  <TableHead>ECU</TableHead>
                  <TableHead>Cours</TableHead>
                  <TableHead>TP/TD</TableHead>
                  <TableHead>SP</TableHead>
                  <TableHead>TPE</TableHead>
                  <TableHead>CC</TableHead>
                  <TableHead>ET</TableHead>
                  <TableHead>CC+ET</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {semester.ues.map((ue) => (
                  <React.Fragment key={ue.codeUE}>
                    {ue.ecs.map((ec, ecIndex) => (
                      <TableRow key={ec.codeEC}>
                        {ecIndex === 0 && (
                          <>
                            <TableCell rowSpan={ue.ecs.length}>{ue.codeUE}</TableCell>
                            <TableCell rowSpan={ue.ecs.length}>{ue.contenu}</TableCell>
                          </>
                        )}
                        <TableCell>{ec.codeEC}</TableCell>
                        <TableCell>{ue.codeUE}</TableCell>
                        <TableCell>{ec.enseignement}</TableCell>
                        <TableCell>{ec.cours}</TableCell>
                        <TableCell>{ec.tpTd}</TableCell>
                        <TableCell>{ec.sp}</TableCell>
                        <TableCell>{ec.tpe}</TableCell>
                        {ecIndex === 0 && (
                          <>
                            <TableCell rowSpan={ue.ecs.length}>{ue.ctt}</TableCell>
                            <TableCell rowSpan={ue.ecs.length}>{ue.cect}</TableCell>
                            <TableCell rowSpan={ue.ecs.length}>{ue.cc ? 'X' : ''}</TableCell>
                            <TableCell rowSpan={ue.ecs.length}>{ue.et ? 'X' : ''}</TableCell>
                            <TableCell rowSpan={ue.ecs.length}>{ue.ccEt ? 'X' : ''}</TableCell>
                          </>
                        )}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
                <TableRow>
                  <TableCell colSpan={8} className="font-bold">TOTAL</TableCell>
                  <TableCell className="font-bold">{semester.total.ctt}</TableCell>
                  <TableCell className="font-bold">{semester.total.cect}</TableCell>
                  <TableCell colSpan={3}></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardHeader>
          <CardTitle>Légende</CardTitle>
        </CardHeader>
        <CardContent>
          <p>UEs Transversales</p>
        </CardContent>
      </Card>
    </div>
  )
}