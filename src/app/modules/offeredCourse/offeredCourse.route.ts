import { Router } from "express";
import validateRequest from '../../midlewares/validateRequest';
import { offeredCourseController } from "./offeredCourse.controller";
import { OfferedCourseValidation } from "./offereCourse.validation";

const router = Router();

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  offeredCourseController.createOfferedCourse
);

export const OfferedCourseRoutes = router;
