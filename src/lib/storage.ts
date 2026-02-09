import { AppData, AppDataSchema } from './schemas';

const STORAGE_KEY = 'tubemarker-data';

export const loadData = (): AppData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return AppDataSchema.parse({});
    }
    const parsed = JSON.parse(data);
    return AppDataSchema.parse(parsed);
  } catch (error) {
    console.error('Failed to load data from storage:', error);
    return AppDataSchema.parse({});
  }
};

export const saveData = (data: AppData): void => {
  try {
    const validated = AppDataSchema.parse(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
  } catch (error) {
    console.error('Failed to save data to storage:', error);
  }
};
