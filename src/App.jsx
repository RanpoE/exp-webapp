import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
// import './App.css'
import Dashboard from "./pages/Dashboard";
import { Layout } from "./shared/Layout";

function App() {

  return (
    <Router>
      <>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </>
    </Router>
  )
}

export default App
