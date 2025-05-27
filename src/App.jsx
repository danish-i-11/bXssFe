import { Feedback } from './comp/FeedbackForm';
import { AdminView } from './comp/AdminView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feedback />} />
        <Route path="/admin" element={<AdminView />} />
      </Routes>
    </Router>
  );
};

export default App;
