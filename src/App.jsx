import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Layout } from "./shared/Layout";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SignUp } from './pages/Login'
import { Home } from "./shared/Home";
import { ProtectedRoutes } from "./shared/ProtectedRoutes";
import { Report } from "./pages/Report";
import { Chat } from "./pages/Chat";

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
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/report" element={<Report />} />
              <Route path="/chat" element={<Chat />} />
              {/* <Route path="/test" element={<LoadOnScroll />} /> */}
              <Route path="chat" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
