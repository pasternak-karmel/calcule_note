import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { CourseFormData } from "@/types";
import { SemesterWithCourses } from "@/db/schema";
import { addCourse, deleteCourse, updateCourse } from "@/actions/courses";

export function useCourses() {
  const queryClient = useQueryClient();

  const coursesQuery = useQuery<SemesterWithCourses[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await fetch("/api/courses");
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return response.json();
    },
  });

  const addCourseMutation = useMutation({
    mutationFn: async ({
      semesterId,
      courseData,
    }: {
      semesterId: string;
      courseData: CourseFormData;
    }) => {
      const result = await addCourse(semesterId, courseData);
      if (result.error) throw new Error(result.error);
      return result.data;
    },
    onMutate: async ({ semesterId, courseData }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["courses"] });

      // Get the current data
      const previousData = queryClient.getQueryData<SemesterWithCourses[]>([
        "courses",
      ]);

      // Optimistically update the cache
      if (previousData) {
        queryClient.setQueryData<SemesterWithCourses[]>(["courses"], (old) => {
          if (!old) return [];
          return old.map((semester) => {
            if (semester.id === semesterId) {
              return {
                ...semester,
                courses: [
                  ...semester.courses,
                  {
                    id: `temp-id-${Date.now()}`,
                    ...courseData,
                  },
                ],
              };
            }
            return semester;
          });
        });
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["courses"], context.previousData);
      }
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Course added successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const updateCourseMutation = useMutation({
    mutationFn: async ({
      courseId,
      courseData,
    }: {
      courseId: string;
      courseData: Partial<CourseFormData>;
    }) => {
      const result = await updateCourse(courseId, courseData);
      if (result.error) throw new Error(result.error);
      return result.data;
    },
    onMutate: async ({ courseId, courseData }) => {
      await queryClient.cancelQueries({ queryKey: ["courses"] });
      const previousData = queryClient.getQueryData<SemesterWithCourses[]>([
        "courses",
      ]);

      if (previousData) {
        queryClient.setQueryData<SemesterWithCourses[]>(["courses"], (old) => {
          if (!old) return [];
          return old.map((semester) => ({
            ...semester,
            courses: semester.courses.map((course) =>
              course.id === courseId ? { ...course, ...courseData } : course
            ),
          }));
        });
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["courses"], context.previousData);
      }
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Course updated successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  const deleteCourseMutation = useMutation({
    mutationFn: async (courseId: string) => {
      const result = await deleteCourse(courseId);
      if (result.error) throw new Error(result.error);
      return result.data;
    },
    onMutate: async (courseId) => {
      await queryClient.cancelQueries({ queryKey: ["courses"] });
      const previousData = queryClient.getQueryData<SemesterWithCourses[]>([
        "courses",
      ]);

      if (previousData) {
        queryClient.setQueryData<SemesterWithCourses[]>(["courses"], (old) => {
          if (!old) return [];
          return old.map((semester) => ({
            ...semester,
            courses: semester.courses.filter(
              (course) => course.id !== courseId
            ),
          }));
        });
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["courses"], context.previousData);
      }
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Course deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  return {
    courses: coursesQuery.data ?? [],
    isLoading: coursesQuery.isLoading,
    isError: coursesQuery.isError,
    error: coursesQuery.error,
    addCourse: addCourseMutation.mutate,
    updateCourse: updateCourseMutation.mutate,
    deleteCourse: deleteCourseMutation.mutate,
    isAddingCourse: addCourseMutation.isPending,
    isUpdatingCourse: updateCourseMutation.isPending,
    isDeletingCourse: deleteCourseMutation.isPending,
  };
}
