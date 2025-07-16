import { useState } from 'react';
import Home from './pages/Home'
import CategoryManagement from './pages/CategoryManagement';
import { RecordProvider } from './contexts/RecordContext';
import RecordList from './pages/RecordList';

const App = () => {
  const [page, setPage] = useState<'home' | 'category' | 'list'>('home');

  return (
    <RecordProvider>
      <nav style={{ padding: '1rem' }}>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('category')}>カテゴリ管理</button>
        <button onClick={() => setPage('list')}>記録一覧</button>
      </nav>
      {page === 'home' ? <Home /> : page === 'category' ? <CategoryManagement /> : <RecordList />}
    </RecordProvider>
  );
}

export default App;