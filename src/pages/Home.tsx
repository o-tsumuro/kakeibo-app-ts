import { useState } from 'react';
import type { RecordType, PaymentSource } from '../types/record';
import { v4 as uuidv4 } from 'uuid';
import { useRecordContext } from '../contexts/RecordContext';
import { getCategoryName } from '../utils/getCategoryName';

const Home = () => {
  const { categories, addRecord, records } = useRecordContext();

  const [type, setType] = useState<RecordType>('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [memo, setMemo] = useState('');

  const [source, setSource] = useState<PaymentSource>('wallet');
  const [categoryId, setCategoryId] = useState<string>('');
  const [from, setFrom] = useState<PaymentSource>('wallet');
  const [to, setTo] = useState<PaymentSource>('bank');

  const handleAdd = () => {
    if (!amount || !date) return;

    const id = uuidv4();
    const base = {
      id,
      type,
      amount: parseFloat(amount),
      date,
      memo: memo || undefined,
    };

    if (type === 'transfer') {
      if (from === to) return alert('出金元と入金先は異なる必要があります');
      addRecord({
        ...base,
        type: 'transfer',
        from,
        to,
      });
    } else {
      if (!categoryId) return alert('カテゴリを選んでください');
      addRecord({
        ...base,
        type,
        categoryId,
        source,
      });
    }

    setAmount('');
    setDate('');
    setMemo('');
    setCategoryId('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>家計簿 - 登録</h2>

      <div>
        <label><input type="radio" value="expense" checked={type === 'expense'} onChange={() => setType('expense')} />支出</label>
        <label><input type="radio" value="income" checked={type === 'income'} onChange={() => setType('income')} />収入</label>
        <label><input type="radio" value="transfer" checked={type === 'transfer'} onChange={() => setType('transfer')} />振替</label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input type="number" placeholder="金額" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <input type="text" placeholder="メモ" value={memo} onChange={(e) => setMemo(e.target.value)} />
      </div>

      {type === 'transfer' ? (
        <div>
          <select value={from} onChange={(e) => setFrom(e.target.value as PaymentSource)}>
            <option value="wallet">財布(出金元)</option>
            <option value="bank">銀行(出金元)</option>
          </select>
          <select value={to} onChange={(e) => setTo(e.target.value as PaymentSource)}>
            <option value="wallet">財布(入金先)</option>
            <option value="bank">銀行(入金先)</option>
          </select>
        </div>
      ) : (
        <div>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">カテゴリを選択</option>
            {categories
              .filter((c) => c.name.includes(`[${type}]`))
              .map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <select value={source} onChange={(e) => setSource(e.target.value as PaymentSource)}>
            <option value="wallet">財布</option>
            <option value="bank">銀行</option>
          </select>
        </div>
      )}

      <button onClick={handleAdd}>追加</button>

      <h3>登録された記録</h3>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {record.date} | {record.type === 'income' ? '+' : record.type === 'expense' ? '-' : '⇄'}
            {record.amount}円
            {record.type === 'transfer'
              ? `(${record.from} → ${record.to})`
              : `(${record.source}) カテゴリ: ${getCategoryName(record.categoryId, categories)}`}
            {record.memo && ` : ${record.memo}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;