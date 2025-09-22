import { Router } from "express";
import { studentRoute } from "../modules/student/student.route";
import { userRoute } from "../modules/user/user.route";
import { academicSemesterRoute } from "../modules/academicSemeter/academicSemester.route";
import { academicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route";
import { academicFacultyRoute } from "../modules/academicFaculty/academicFaculty.route";
import { FacultyRoute } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CourseRoute } from "../modules/Course/course.route";


const router = Router();



const moduleRoutes = [
  {
    path:'/student',
    route:studentRoute,
  },
  {
    path:'/users',
    route:userRoute,
  },
  {
    path:'/academic-semester',
    route:academicSemesterRoute,
  },
  {
    path:'/academic-faculty',
    route:academicFacultyRoute,
  },
  {
    path:'/academic-department',
    route:academicDepartmentRoute,
  },
  {
  path: '/faculties',
  route: FacultyRoute,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoute,
  },
]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router;