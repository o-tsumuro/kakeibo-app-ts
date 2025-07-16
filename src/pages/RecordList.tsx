import { useRecordContext } from '../contexts/RecordContext';
import { useState } from 'react';
import type { RecordType } from '../types/record';
import { getCategoryName } from '../utils/getCategoryName';

const RecordList = () => {
  const { records, categories } = useRecordContext();
  const [filterType, setFilterType] = useState<RecordType | 'all'>('all');
  const [filterMonth, setFilterMonth] = useState('');

  const filtered = records.filter((r) => {
    const matchType = filterType === 'all' || r.type === filterType;
    const matchMonth =
      !filterMonth || r.date.startsWith(filterMonth);
    return matchType && matchMonth;
  });

  return (
    <div style={{ padding: '1rem' }}>
      <h2>記録一覧</h2>

      <div style={{ marginBottom: '1rem' }}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value as RecordType | 'all')}>
          <option value="all">すべて</option>
          <option value="expense">支出</option>
          <option value="income">収入</option>
          <option value="transfer">振替</option>
        </select>

        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          style={{ marginLeft: '1rem'}}
          />
      </div>
      
      <ul>
        {filtered.length === 0 && <li>該当する記録はありません</li>}
        {filtered.map((record) => (
          <li key={record.id}>
            {record.date} | {record.type === 'income' ? '+' : record.type === 'expense' ? '-' : '⇄'}
            {record.amount}円
            {record.type === 'transfer'
              ? `(${record.from} → ${record.to})`
              : `(${record.source})カテゴリ: ${getCategoryName(record.categoryId, categories)}`}
            {record.memo && ` ：${record.memo}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordList;