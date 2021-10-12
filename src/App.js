//import logo from './logo.svg';
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext.jsx";

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Main/>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
