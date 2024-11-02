"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'

type Course = {
  id: string
  codeUE: string
  codeEC: string
  contenu: string
  enseignement: string
  cours: number
  tpTd: number
  sp: number
  tpe: number
  ctt: number
  cect: number
  cc: boolean
  et: boolean
  ccEt: boolean
  professor: string
}

type Semester = {
  name: string
  courses: Course[]
}

export default function ClasseId({ params }: { params: { id: string } }) {
  const { id } = params
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      name: "Cinquième semestre",
      courses: [
        { id: "1", codeUE: "INF1521", codeEC: "1INF1521", contenu: "Infographie 2D et 3D", enseignement: "Infographie 2D et 3D", cours: 10, tpTd: 40, sp: 0, tpe: 50, ctt: 100, cect: 4, cc: false, et: false, ccEt: true, professor: "" },
        { id: "2", codeUE: "INF1522", codeEC: "1INF1522", contenu: "Technologies Immersives", enseignement: "Concepts des technologies immersives (RA, RV, RM, RX)", cours: 15, tpTd: 10, sp: 0, tpe: 25, ctt: 125, cect: 5, cc: false, et: true, ccEt: false, professor: "" },
        { id: "3", codeUE: "INF1522", codeEC: "2INF1522", contenu: "Technologies Immersives", enseignement: "Applications des technologies immersives", cours: 15, tpTd: 10, sp: 0, tpe: 50, ctt: 125, cect: 5, cc: false, et: true, ccEt: false, professor: "" },
      ]
    },
    {
      name: "Sixième semestre",
      courses: [
        { id: "1", codeUE: "TCC1621", codeEC: "1TCC1621", contenu: "Stage (12 semaines)", enseignement: "Stage (12 semaines)", cours: 0, tpTd: 0, sp: 0, tpe: 0, ctt: 425, cect: 17, cc: false, et: false, ccEt: true, professor: "" },
        { id: "2", codeUE: "TCC1622", codeEC: "1TCC1622", contenu: "Discipline", enseignement: "Discipline", cours: 0, tpTd: 0, sp: 0, tpe: 0, ctt: 25, cect: 1, cc: false, et: false, ccEt: true, professor: "" },
      ]
    }
  ])

  const [editingCourse, setEditingCourse] = useState<Course | null>(null)

  const addCourse = (semesterIndex: number) => {
    const newCourse: Course = {
      id: Date.now().toString(),
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
      professor: ""
    }
    const updatedSemesters = [...semesters]
    updatedSemesters[semesterIndex].courses.push(newCourse)
    setSemesters(updatedSemesters)
    setEditingCourse(newCourse)
  }

  const deleteCourse = (semesterIndex: number, courseId: string) => {
    const updatedSemesters = [...semesters]
    updatedSemesters[semesterIndex].courses = updatedSemesters[semesterIndex].courses.filter(course => course.id !== courseId)
    setSemesters(updatedSemesters)
    if (editingCourse?.id === courseId) {
      setEditingCourse(null)
    }
  }

  const editCourse = (course: Course) => {
    setEditingCourse(course)
  }

  const saveCourse = () => {
    if (editingCourse) {
      const updatedSemesters = semesters.map(semester => ({
        ...semester,
        courses: semester.courses.map(course => 
          course.id === editingCourse.id ? editingCourse : course
        )
      }))
      setSemesters(updatedSemesters)
      setEditingCourse(null)
    }
  }

  const cancelEdit = () => {
    setEditingCourse(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Course) => {
    if (editingCourse) {
      setEditingCourse({
        ...editingCourse,
        [field]: field === 'cc' || field === 'et' || field === 'ccEt' ? e.target.checked : e.target.value
      })
    }
  }

  return (
    <Tabs defaultValue={semesters[0].name} className="w-full">
      <TabsList>
        {semesters.map((semester, index) => (
          <TabsTrigger key={index} value={semester.name}>{semester.name}</TabsTrigger>
        ))}
      </TabsList>
      {semesters.map((semester, semesterIndex) => (
        <TabsContent key={semesterIndex} value={semester.name}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{semester.name}</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code UE</TableHead>
                  <TableHead>Code EC</TableHead>
                  <TableHead>Contenu des enseignements</TableHead>
                  <TableHead>Enseignements</TableHead>
                  <TableHead>Cours</TableHead>
                  <TableHead>TP/TD</TableHead>
                  <TableHead>SP</TableHead>
                  <TableHead>TPE</TableHead>
                  <TableHead>CTT</TableHead>
                  <TableHead>CECT</TableHead>
                  <TableHead>CC</TableHead>
                  <TableHead>ET</TableHead>
                  <TableHead>CC+ET</TableHead>
                  <TableHead>Professeur</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {semester.courses.map((course) => (
                  <TableRow key={course.id}>
                    {editingCourse?.id === course.id ? (
                      <>
                        <TableCell><Input value={editingCourse.codeUE} onChange={(e) => handleInputChange(e, 'codeUE')} /></TableCell>
                        <TableCell><Input value={editingCourse.codeEC} onChange={(e) => handleInputChange(e, 'codeEC')} /></TableCell>
                        <TableCell><Input value={editingCourse.contenu} onChange={(e) => handleInputChange(e, 'contenu')} /></TableCell>
                        <TableCell><Input value={editingCourse.enseignement} onChange={(e) => handleInputChange(e, 'enseignement')} /></TableCell>
                        <TableCell><Input type="number" value={editingCourse.cours} onChange={(e) => handleInputChange(e, 'cours')} /></TableCell>
                        <TableCell><Input type="number" value={editingCourse.tpTd} onChange={(e) => handleInputChange(e, 'tpTd')} /></TableCell>
                        <TableCell><Input type="number" value={editingCourse.sp} onChange={(e) => handleInputChange(e, 'sp')} /></TableCell>
                        <TableCell><Input type="number" value={editingCourse.tpe} onChange={(e) => handleInputChange(e, 'tpe')} /></TableCell>
                        <TableCell><Input type="number" value={editingCourse.ctt} onChange={(e) => handleInputChange(e, 'ctt')} /></TableCell>
                        <TableCell><Input type="number" value={editingCourse.cect} onChange={(e) => handleInputChange(e, 'cect')} /></TableCell>
                        <TableCell><Input type="checkbox" checked={editingCourse.cc} onChange={(e) => handleInputChange(e, 'cc')} /></TableCell>
                        <TableCell><Input type="checkbox" checked={editingCourse.et} onChange={(e) => handleInputChange(e, 'et')} /></TableCell>
                        <TableCell><Input type="checkbox" checked={editingCourse.ccEt} onChange={(e) => handleInputChange(e, 'ccEt')} /></TableCell>
                        <TableCell><Input value={editingCourse.professor} onChange={(e) => handleInputChange(e, 'professor')} /></TableCell>
                        <TableCell>
                          <Button onClick={saveCourse} className="mr-2"><Save /></Button>
                          <Button onClick={cancelEdit}><X /></Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{course.codeUE}</TableCell>
                        <TableCell>{course.codeEC}</TableCell>
                        <TableCell>{course.contenu}</TableCell>
                        <TableCell>{course.enseignement}</TableCell>
                        <TableCell>{course.cours}</TableCell>
                        <TableCell>{course.tpTd}</TableCell>
                        <TableCell>{course.sp}</TableCell>
                        <TableCell>{course.tpe}</TableCell>
                        <TableCell>{course.ctt}</TableCell>
                        <TableCell>{course.cect}</TableCell>
                        <TableCell>{course.cc ? 'Oui' : 'Non'}</TableCell>
                        <TableCell>{course.et ? 'Oui' : 'Non'}</TableCell>
                        <TableCell>{course.ccEt ? 'Oui' : 'Non'}</TableCell>
                        <TableCell>{course.professor}</TableCell>
                        <TableCell>
                          <Button onClick={() => editCourse(course)} className="mr-2"><Edit2 /></Button>
                          <Button onClick={() => deleteCourse(semesterIndex, course.id)}><Trash2 /></Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button onClick={() => addCourse(semesterIndex)}><Plus /> Ajouter un cours</Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
