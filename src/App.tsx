import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ChakraProvider } from "@chakra-ui/react";
import Thread from "./pages/Thread";
import { extendTheme } from "@chakra-ui/react";
import Follows from "./pages/Follows";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./pages/Search";
import Profile from "./components/UserProfile";
import Main from "./components/Main";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "#1d1d1d",
                color: "#f2f2f2",
            },
        },
    },
});

function IsLogin() {
    const token = document.cookie.replace("C.id=", "");
    if (token) {
        return <Navigate to={"/"} />;
    }

    return <Outlet />;
}

function IsNotLogin() {
    const token = document.cookie.replace("C.id=", "");
    if (token) {
        return <Navigate to={"/"} />;
    }

    return <Outlet />;
}

function App() {
    return (
        <>
            <ChakraProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/:username" element={<Profile />} />
                        {/* <Route path="/" element={<IsLogin />}> */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* </Route> */}
                        {/* <Route path="/" element={<IsNotLogin />}> */}
                        <Route path="/follow" element={<Follows />} />
                        {/* </Route> */}
                        <Route path="/thread/:id" element={<Thread />} />
                        <Route path="/search" element={<Search />} />
                    </Routes>
                </Router>
            </ChakraProvider>
        </>
    );
}

export default App;
