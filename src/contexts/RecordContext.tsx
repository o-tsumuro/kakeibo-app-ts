import { createContext, useContext, useState, useEffect } from 'react';
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

const STORAGE_KEY = {
  categories: 'myapp_categories',
  records: 'myapp_records',
}

export const RecordProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [records, setRecords] = useState<RecordItem[]>([]);

  useEffect(() => {
    const savedCategories = localStorage.getItem(STORAGE_KEY.categories);
    const savedRecords = localStorage.getItem(STORAGE_KEY.records);

    if (savedCategories) {
      try {
        setCategories(JSON.parse(savedCategories) as Category[]);
      } catch {}
    }

    if (savedRecords) {
      try {
        setRecords(JSON.parse(savedRecords) as RecordItem[]);
      } catch {}
    } 
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY.categories, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY.records, JSON.stringify(records));
  }, [records]);

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