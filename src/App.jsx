import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
// import './App.css'
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./shared/Layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});

function App() {

  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
