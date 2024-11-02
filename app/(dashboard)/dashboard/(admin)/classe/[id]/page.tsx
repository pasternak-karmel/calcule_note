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

  const handleAddCourse = (semesterId: string) => {
    const newCourse = {
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
      classId,
    };

    addCourse({ semesterId, courseData: newCourse });
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

  return (
    <>
    
    </>
  );
}
