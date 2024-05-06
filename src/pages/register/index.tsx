import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { text } from "../../styles/style";
import FormRegister from "./components/FormRegister";

const Register = () => {
    return (
        <Box w={"md"} mx={"auto"} mt={"5rem"} border={"1px solid #555"} borderRadius={20} p={5}>
            <Link to={"/"}>
                <Heading color={text.active} mb={1}>
                    circle
                </Heading>
            </Link>
            <Text fontSize={25} mb={2}>
                Create Circle's account
            </Text>
            <FormRegister />
            <Text>
                Already have account?{" "}
                <Link to={"/login"} color={text.active} style={{ textDecoration: "underline" }}>
                    Login
                </Link>
            </Text>
        </Box>
    );
};

export default Register;
