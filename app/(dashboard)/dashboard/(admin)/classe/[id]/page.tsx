"use client";
import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourses } from "@/hooks/useCourses";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CourseWithUE } from "@/db/schema";
import { Loader2 } from "lucide-react";

export default function CourseManagement() {
  const { courses, isLoading, isError, updateCourse } = useCourses();
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [editedCourses, setEditedCourses] = useState<{
    [key: string]: CourseWithUE;
  }>({});
  const [hasChanges, setHasChanges] = useState(false);

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
  if (courses.length === 0)
    return <div>No semesters found. Please run the setup script.</div>;

  const handleSemesterChange = (semesterId: string) => {
    setSelectedSemester(semesterId);
    setEditedCourses({});
    setHasChanges(false);
  };

  const handleCourseChange = (
    courseId: string,
    field: keyof CourseWithUE,
    value: unknown
  ) => {
    setEditedCourses((prev) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const saveChanges = async () => {
    for (const [courseId, courseData] of Object.entries(editedCourses)) {
      updateCourse({ courseId, courseData });
    }
    setEditedCourses({});
    setHasChanges(false);
    toast.success("All changes saved successfully");
  };

  const currentSemester = courses.find((sem) => sem.id === selectedSemester);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Management</h1>

      <Select onValueChange={handleSemesterChange}>
        <SelectTrigger className="w-[200px] mb-4">
          <SelectValue placeholder="Select Semester" />
        </SelectTrigger>
        <SelectContent>
          {courses.map((semester) => (
            <SelectItem key={semester.id} value={semester.id}>
              {semester.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {currentSemester && (
        <div className="space-y-4">
          {currentSemester.courses.map((course) => (
            <Card key={course.id}>
              <CardHeader>
                <CardTitle>{course.enseignement}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`codeUE-${course.id}`}>Code UE</Label>
                    <Input
                      id={`codeUE-${course.id}`}
                      value={editedCourses[course.id]?.codeUE ?? course.codeUE}
                      onChange={(e) =>
                        handleCourseChange(course.id, "codeUE", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`codeEC-${course.id}`}>Code EC</Label>
                    <Input
                      id={`codeEC-${course.id}`}
                      value={editedCourses[course.id]?.codeEC ?? course.codeEC}
                      onChange={(e) =>
                        handleCourseChange(course.id, "codeEC", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`contenu-${course.id}`}>Contenu</Label>
                    <Input
                      id={`contenu-${course.id}`}
                      value={
                        editedCourses[course.id]?.contenu ?? course.contenu
                      }
                      onChange={(e) =>
                        handleCourseChange(course.id, "contenu", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`enseignement-${course.id}`}>
                      Enseignement
                    </Label>
                    <Input
                      id={`enseignement-${course.id}`}
                      value={
                        editedCourses[course.id]?.enseignement ??
                        course.enseignement
                      }
                      onChange={(e) =>
                        handleCourseChange(
                          course.id,
                          "enseignement",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`cours-${course.id}`}>Cours</Label>
                    <Input
                      id={`cours-${course.id}`}
                      type="number"
                      value={editedCourses[course.id]?.cours ?? course.cours}
                      onChange={(e) =>
                        handleCourseChange(
                          course.id,
                          "cours",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`tpTd-${course.id}`}>TP/TD</Label>
                    <Input
                      id={`tpTd-${course.id}`}
                      type="number"
                      value={editedCourses[course.id]?.tpTd ?? course.tpTd}
                      onChange={(e) =>
                        handleCourseChange(
                          course.id,
                          "tpTd",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`sp-${course.id}`}>SP</Label>
                    <Input
                      id={`sp-${course.id}`}
                      type="number"
                      value={editedCourses[course.id]?.sp ?? course.sp}
                      onChange={(e) =>
                        handleCourseChange(
                          course.id,
                          "sp",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`tpe-${course.id}`}>TPE</Label>
                    <Input
                      id={`tpe-${course.id}`}
                      type="number"
                      value={editedCourses[course.id]?.tpe ?? course.tpe}
                      onChange={(e) =>
                        handleCourseChange(
                          course.id,
                          "tpe",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`ctt-${course.id}`}>CTT</Label>
                    <Input
                      id={`ctt-${course.id}`}
                      type="number"
                      value={editedCourses[course.id]?.ctt ?? course.ctt}
                      onChange={(e) =>
                        handleCourseChange(
                          course.id,
                          "ctt",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor={`cect-${course.id}`}>CECT</Label>
                    <Input
                      id={`cect-${course.id}`}
                      type="number"
                      value={editedCourses[course.id]?.cect ?? course.cect}
                      onChange={(e) =>
                        handleCourseChange(
                          course.id,
                          "cect",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`cc-${course.id}`}
                      checked={editedCourses[course.id]?.cc ?? course.cc}
                      onCheckedChange={(checked) =>
                        handleCourseChange(course.id, "cc", checked)
                      }
                    />
                    <Label htmlFor={`cc-${course.id}`}>CC</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`et-${course.id}`}
                      checked={editedCourses[course.id]?.et ?? course.et}
                      onCheckedChange={(checked) =>
                        handleCourseChange(course.id, "et", checked)
                      }
                    />
                    <Label htmlFor={`et-${course.id}`}>ET</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`ccEt-${course.id}`}
                      checked={editedCourses[course.id]?.ccEt ?? course.ccEt}
                      onCheckedChange={(checked) =>
                        handleCourseChange(course.id, "ccEt", checked)
                      }
                    />
                    <Label htmlFor={`ccEt-${course.id}`}>CC/ET</Label>
                  </div>
                  <div>
                    <Label htmlFor={`professor-${course.id}`}>Professor</Label>
                    <Input
                      id={`professor-${course.id}`}
                      value={
                        editedCourses[course.id]?.professor ?? course.professor
                      }
                      onChange={(e) =>
                        handleCourseChange(
                          course.id,
                          "professor",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {hasChanges && (
        <Button className="mt-4" onClick={saveChanges}>
          Save Changes
        </Button>
      )}
    </div>
  );
}
