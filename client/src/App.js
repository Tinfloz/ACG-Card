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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import SignIn from './pages/SignIn';
import CreateTag from './pages/CreateTag';
import GetAllTags from './pages/GetAllTags';
import CreateContentOrDeleteTag from './pages/CreateContentOrDeleteTag';
import Dashboard from './pages/Dashboard';
import TagPageNonMarketing from './pages/TagPageNonMarketing';
import Test from './components/Test';
import GetContentByTag from './pages/GetContentByTag';

function App() {

  const user = useSelector(state => state.auth.user);

  return (
    <ChakraProvider theme={theme}>
      <Box overflow="hidden" flexDirection={"column"} display={"flex"} h="100vh">
        <NavBar user={user} />
        {/* <UserCreds /> */}
        <Router>
          <Routes>
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/create/tag" element={<CreateTag />} />
            <Route path="/get/tags" element={<GetAllTags />} />
            <Route path="/tag/:tagName" element={<CreateContentOrDeleteTag />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dept/tag" element={<TagPageNonMarketing />} />
            <Route path="/test" element={<Test />} />
            <Route path="/get/content/:tag" element={<GetContentByTag />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
