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
// import 'react-calendar/dist/Calendar.css';
// import "./calendar.css"
import GetEventsByTag from './pages/GetEventsByTag';
import SetPriority from './pages/SetPriority';
import GetCountriesForPriority from './pages/GetCountriesForPriority';
import Settings from './pages/Settings';

function App() {

  const user = useSelector(state => state.auth.user);

  const requireAuth = (element) => {
    return user ? element : <Navigate to="/signIn" />;
  };

  const requireMarketingAuth = (element) => {
    if (user) {
      if (user?.role === "Marketing") {
        return element
      };
      return <Navigate to="/signIn" />
    };
    return <Navigate to="/signIn" />
  };

  return (
    <ChakraProvider theme={theme}>
      <Box overflow="hidden" flexDirection={"column"} display={"flex"} h="100vh">
        <NavBar user={user} />
        <Router>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/create/tag" element={requireMarketingAuth(<CreateTag />)} />
            <Route path="/get/tags" element={requireMarketingAuth(<GetAllTags />)} />
            <Route path="/tag/:tagName" element={requireMarketingAuth(<CreateContentOrDeleteTag />)} />
            <Route path="/dashboard" element={requireAuth(<Dashboard />)} />
            <Route path="/dept/tag" element={requireAuth(<TagPageNonMarketing />)} />
            <Route path="/get/content/:tag" element={requireMarketingAuth(<GetContentByTag />)} />
            <Route path="/get/event/:tag" element={requireMarketingAuth(<GetEventsByTag />)} />
            <Route path="/u/:associate" element={<ScannedCard />} />
            <Route path="/tags/:location" element={requireAuth(<SetPriority />)} />
            <Route path="/my/locations" element={requireAuth(<GetCountriesForPriority />)} />
            <Route path="/change/details" element={requireAuth(<Settings />)} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
