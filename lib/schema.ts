import { z } from 'zod';

export const ProgramEnum = z.enum(['APZ', 'APZ+', 'EFA', 'CCD', 'PLA', 'J+D', 'QI', 'VA']);

export const CourseSchema = z.object({
  id: z.string().min(1),
  program: ProgramEnum,
  subprogram: z.string().optional(),
  designation: z.string().min(1),
  inscrição: z.string().optional(),
  monthStart: z.string().optional(),
  concelho: z.string().optional(),
  regime: z.string().optional(),
  horario: z.string().optional(),
  hours: z.number().int().positive().optional(),
  access: z.string().optional(),
  requirementsText: z.string().optional(),
  notes: z.array(z.string()).optional()
});

export type Course = z.infer<typeof CourseSchema>;

export const DatasetSchema = z.object({
  meta: z.object({
    title: z.string(),
    updateDate: z.string(),
    trimester: z.string().optional(),
    contactEmail: z.string().optional(),
    signupHint: z.string().optional(),
    sourcePdf: z.string().optional()
  }),
  importantNotes: z.array(z.string()),
  sections: z.array(
    z.object({
      program: ProgramEnum,
      title: z.string(),
      anchor: z.string(),
      requirementsText: z.string().optional(),
      notes: z.array(z.string()).optional(),
      subprograms: z
        .array(
          z.object({
            title: z.string(),
            anchor: z.string(),
            requirementsText: z.string().optional(),
            notes: z.array(z.string()).optional()
          })
        )
        .optional()
    })
  ),
  courses: z.array(CourseSchema)
});

export type Dataset = z.infer<typeof DatasetSchema>;
