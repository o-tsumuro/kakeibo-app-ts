import { useRecordContext } from '../contexts/RecordContext';

const Balance = () => {
  const { records } = useRecordContext();

  let wallet = 0;
  let bank = 0;

  for (const record of records) {
    if (record.type === 'income') {
      if (record.source === 'wallet') wallet += record.amount;
      if (record.source === 'bank') bank += record.amount;
    } else if (record.type === 'expense') {
      if (record.source === 'wallet') wallet -= record.amount;
      if (record.source === 'bank') bank -= record.amount;
    } else if (record.type === 'transfer') {
      wallet += record.to === 'wallet' ? record.amount : 0;
      bank += record.to === 'bank' ? record.amount :0;
      wallet -= record.from === 'wallet' ? record.amount : 0;
      bank -= record.from === 'bank' ? record.amount : 0;
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3>現在の残高</h3>
      <ul>
        <li>財布：{wallet}円</li>
        <li>銀行：{bank}円</li>
      </ul>
    </div>
  );
};

export default Balance;