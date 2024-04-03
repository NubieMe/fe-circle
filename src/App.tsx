import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/index";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import Thread from "./pages/thread";
import { extendTheme } from "@chakra-ui/react";
import Follows from "./pages/follow";
import Login from "./pages/login";
import Register from "./pages/register";
import Search from "./pages/search";
import Profile from "./pages/profile";
import { Layout } from "./layout/Layout";
import Cookies from "js-cookie";

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
    const token = Cookies.get("C.id");
    if (!token) {
        return <Navigate to={"/login"} />;
    }

    return <Outlet />;
}

function IsNotLogin() {
    const token = Cookies.get("C.id");
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
                        <Route path="*" element={<Heading>Not Found</Heading>} />
                        <Route path="/" element={<IsLogin />}>
                            <Route path="/" element={<Layout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/follow" element={<Follows />} />
                                <Route path="/search" element={<Search />} />
                            </Route>
                        </Route>
                        <Route path="/" element={<IsNotLogin />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route path="/" element={<Layout />}>
                            <Route path="/:username" element={<Profile />} />
                            <Route path="/thread/:id" element={<Thread />} />
                        </Route>
                    </Routes>
                </Router>
            </ChakraProvider>
        </>
    );
}

export default App;
