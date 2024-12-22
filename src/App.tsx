
import './App.css';
import { Route, Routes } from 'react-router';
import { Page1 } from './ui/pages/page1';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
    </Routes>
  );
}

export default App;