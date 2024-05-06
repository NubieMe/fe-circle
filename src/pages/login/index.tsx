import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { text } from "../../styles/style";
import FormLogin from "./components/FormLogin";

const Login = () => {
    return (
        <Box w={"md"} mx={"auto"} mt={"5rem"} border={"1px solid #555"} borderRadius={20} p={5}>
            <Link to={"/"}>
                <Heading color={text.active} mb={1}>
                    circle
                </Heading>
            </Link>
            <Text fontSize={25} mb={2}>
                Login to Circle
            </Text>
            <FormLogin />
            <Text>
                Don't have account?{" "}
                <Link to={"/register"} color={text.active} style={{ textDecoration: "underline" }}>
                    Register
                </Link>
            </Text>
        </Box>
    );
};

export default Login;
