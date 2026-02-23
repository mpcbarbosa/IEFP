import { z } from "zod";

const ProgramEnum = z.enum(["APZ", "APZ+", "EFA", "CCD", "PLA", "J+D", "QI", "VA"]);

const CourseSchema = z.object({
  id: z.string().min(1),
  program: ProgramEnum,
  subprogram: z.string().optional(),
  designation: z.string().min(1),
  inscrição: z.string().optional(),
  monthStart: z.string().optional(),
  concelho: z.string().optional(),
  regime: z.string().optional(),
  horario: z.string().optional(),
  hours: z.number().optional(),
  access: z.string().optional(),
  requirementsText: z.string().optional(),
  notes: z.array(z.string()).optional(),
});

const CoursesSchema = z.array(CourseSchema);

export type Course = z.infer<typeof CourseSchema>;

export function validateCourses(input: unknown): Course[] {
  return CoursesSchema.parse(input);
}
