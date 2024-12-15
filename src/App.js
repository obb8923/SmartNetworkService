import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Page1 from './pages/1';
import Page2 from './pages/2';
import Page3 from './pages/3';
import Page4 from './pages/4';
import Page5 from './pages/5';
import Page6 from './pages/6';
import Page7 from './pages/7';
import Page8 from './pages/8';
import Page9 from './pages/9';
import Page10 from './pages/10';
import Page11 from './pages/11.jsx';
import Page12 from './pages/12';
import Page13 from './pages/13';
import Page14 from './pages/14';
import Page15 from './pages/15';
import Page16 from './pages/16';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/1" element={<Page1 />} />
          <Route path="/2" element={<Page2 />} />
          <Route path="/3" element={<Page3 />} />
          <Route path="/4" element={<Page4 />} />
          <Route path="/5" element={<Page5 />} />
          <Route path="/6" element={<Page6 />} />
          <Route path="/7" element={<Page7 />} />
          <Route path="/8" element={<Page8 />} />
          <Route path="/9" element={<Page9 />} />
          <Route path="/10" element={<Page10 />} />
          <Route path="/11" element={<Page11 />} />
          <Route path="/12" element={<Page12 />} />
          <Route path="/13" element={<Page13 />} />
          <Route path="/14" element={<Page14 />} />
          <Route path="/15" element={<Page15 />} />
          <Route path="/16" element={<Page16 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
