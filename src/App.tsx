
import './App.css';
import { Route, Routes } from 'react-router';
import { Page1 } from './ui/pages/page1';
import Page3 from './ui/pages/page3';
import { Page2 } from './ui/pages/page2';
import Share from './ui/pages/share';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/page3" element={<Page3 />} />
      <Route path ="/trip/:id" element={<Share/>} />
      <Route path="/trip" element={<Page2 />} />
    
    </Routes>
  );
}

export default App;