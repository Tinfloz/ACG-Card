import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import NavBar from './components/NavBar';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import SignIn from './pages/SignIn';
import CreateTag from './pages/CreateTag';
import GetAllTags from './pages/GetAllTags';
import CreateContentOrDeleteTag from './pages/CreateContentOrDeleteTag';
import Dashboard from './pages/Dashboard';
import TagPageNonMarketing from './pages/TagPageNonMarketing';
import GetContentByTag from './pages/GetContentByTag';
import ScannedCard from './pages/ScannedCard';
import 'react-calendar/dist/Calendar.css';
import "./calendar.css"

function App() {

  const user = useSelector(state => state.auth.user);

  const requireAuth = (element) => {
    return user ? element : <Navigate to="/signIn" />;
  };

  return (
    <ChakraProvider theme={theme}>
      <Box overflow="hidden" flexDirection={"column"} display={"flex"} h="100vh">
        <NavBar user={user} />
        {/* <UserCreds /> */}
        <Router>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/create/tag" element={requireAuth(<CreateTag />)} />
            <Route path="/get/tags" element={requireAuth(<GetAllTags />)} />
            <Route path="/tag/:tagName" element={requireAuth(<CreateContentOrDeleteTag />)} />
            <Route path="/dashboard" element={requireAuth(<Dashboard />)} />
            <Route path="/dept/tag" element={requireAuth(<TagPageNonMarketing />)} />
            <Route path="/get/content/:tag" element={requireAuth(<GetContentByTag />)} />
            <Route path="/scanned/card/:associate" element={<ScannedCard />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
