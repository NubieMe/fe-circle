import { Navigate, Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import Thread from "./pages/Thread";
import { extendTheme } from "@chakra-ui/react";
import Follows from "./pages/Follows";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
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
                            <Route
                                path="/"
                                element={
                                    <Layout home>
                                        <Home />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/follow"
                                element={
                                    <Layout follows>
                                        <Follows />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/search"
                                element={
                                    <Layout search>
                                        <Search />
                                    </Layout>
                                }
                            />
                        </Route>
                        <Route path="/" element={<IsNotLogin />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route path="/:username" element={<Profile />} />
                        <Route path="/thread/:id" element={<Thread />} />
                    </Routes>
                </Router>
            </ChakraProvider>
        </>
    );
}

export default App;
