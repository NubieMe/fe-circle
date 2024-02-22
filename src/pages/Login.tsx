import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { text } from "../styles/style";
import FormLogin from "../features/auth/components/FormLogin";

const Login = () => {
    const navigate = useNavigate();

    return (
        <Box w={"md"} mx={"auto"} mt={"5rem"} border={"1px solid #555"} borderRadius={20} p={5}>
            <Link onClick={() => navigate("/")}>
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
                <Link onClick={() => navigate("/register")} color={text.active}>
                    Register
                </Link>
            </Text>
        </Box>
    );
};

export default Login;
