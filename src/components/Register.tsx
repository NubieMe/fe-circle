import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { text } from "../styles/style";
import FormRegister from "../features/auth/components/FormRegister";

const Register = () => {
    const navigate = useNavigate();

    return (
        <Box w={"md"} mx={"auto"} mt={"5rem"} border={"1px solid #555"} borderRadius={20} p={5}>
            <Link onClick={() => navigate("/")}>
                <Heading color={text.active} mb={1}>
                    circle
                </Heading>
            </Link>
            <Text fontSize={25} mb={2}>
                Create account Circle
            </Text>
            <FormRegister />
            <Text>
                Already have account?{" "}
                <Link onClick={() => navigate("/login")} color={text.active}>
                    Login
                </Link>
            </Text>
        </Box>
    );
};

export default Register;
