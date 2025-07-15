import { useState } from 'react';
import Home from './pages/Home'
import CategoryManagement from './pages/CategoryManagement';
import { RecordProvider } from './contexts/RecordContext';

const App = () => {
  const [page, setPage] = useState<'home' | 'category'>('home');

  return (
    <RecordProvider>
      <nav style={{ padding: '1rem' }}>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('category')}>カテゴリ管理</button>
      </nav>
      {page === 'home' ? <Home /> : <CategoryManagement />}
    </RecordProvider>
  );
}

export default App;