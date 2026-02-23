import datasetJson from '@/data/courses.json';
import { DatasetSchema, type Dataset } from './schema';

export function getDataset(): Dataset {
  const parsed = DatasetSchema.safeParse(datasetJson);
  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error(parsed.error.flatten());
    throw new Error('Dataset inválido (courses.json).');
  }
  return parsed.data;
}
