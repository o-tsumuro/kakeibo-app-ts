import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Category, RecordItem } from '../types/record';

type RecordContextType = {
  categories: Category[];
  records: RecordItem[];
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addRecord: (record: RecordItem) => void;
};

const RecordContext = createContext<RecordContextType | undefined>(undefined);

export const useRecordContext = () => {
  const context = useContext(RecordContext);
  if (!context) throw new Error('useRecordContext must be used within a RecordProvider');
  return context;
};

export const RecordProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [records, setRecords] = useState<RecordItem[]>([]);

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const addRecord = (record: RecordItem) => {
    setRecords((prev) => [...prev, record]);
  };

  return (
    <RecordContext.Provider
      value={{ categories, records, addCategory, deleteCategory, addRecord }}
    >
      {children}
    </RecordContext.Provider>
  );
};