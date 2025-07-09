import { useState } from 'react';
import Home from './pages/Home'
import CategoryManagement from './pages/CategoryManagement';

const App = () => {
  const [page, setPage] = useState<'home' | 'category'>('home');

  return (
    <>
      <nav style={{ padding: '1rem' }}>
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('category')}>カテゴリ管理</button>
      </nav>
      {page === 'home' ? <Home /> : <CategoryManagement />}
    </>
  );
}

export default App;