import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Category, RecordType } from '../types/record';

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState('');
  const [type, setType] = useState<RecordType>('expense');

  const handleAdd = () => {
    if (!name.trim()) return;

    const newCategory: Category = {
      id: uuidv4(),
      name: `${name.trim()} [${type}]`,
    };

    setCategories((prev) => [...prev, newCategory]);
    setName('');
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>カテゴリ管理</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="カテゴリ名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value as RecordType)}>
          <option value="expense">支出</option>
          <option value="income">収入</option>
        </select>
        <button onClick={handleAdd}>追加</button>
      </div>

      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            {cat.name}
            <button onClick={() => handleDelete(cat.id)} style={{ marginLeft: '1rem' }}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;