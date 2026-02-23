import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Editor from './pages/Editor';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

export default App;