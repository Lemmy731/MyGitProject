import PageList from "./components/PageList";
import RepositoryData from "./components/RepositoryData";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <ErrorBoundary>
      <Routes>
      <Route path='/' element={<PageList/>} />
      <Route path="/repository/:id" element={<RepositoryData/>} />
      <Route path="*" element={<NotFound/>} />
      </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
