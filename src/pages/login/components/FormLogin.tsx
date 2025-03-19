import { Alert, AlertDescription, AlertIcon, Button, Input, Stack } from "@chakra-ui/react";
import { text } from "../../../styles/style";
import { useLogin } from "../../../hooks/useLogin";
import { useAppSelector } from "../../../stores/hooks";

export default function FormLogin() {
    const message = useAppSelector((state) => state.msgLogin.message);
    const { handleChange, login } = useLogin();

    return (
        <>
            {message && (
                <Alert status="error" borderRadius={5} mb={3}>
                    <AlertIcon />
                    <AlertDescription bg={"none"} color={"black"}>
                        {message}
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={(e) => login(e)}>
                <Stack spacing={3} mb={3}>
                    <Input
                        onChange={(e) => handleChange(e)}
                        name="username"
                        placeholder="Username/Email"
                        border={"1px solid #555"}
                        autoComplete="off"
                    />
                    <Input
                        onChange={(e) => handleChange(e)}
                        type="password"
                        name="password"
                        placeholder="Password"
                        border={"1px solid #555"}
                        autoComplete="off"
                    />
                </Stack>
                <Button
                    type="submit"
                    w={"100%"}
                    _hover={{ bg: "green.500" }}
                    bgColor={text.active}
                    color={text.primary}
                    mb={3}
                    borderRadius={20}>
                    Login
                </Button>
            </form>
        </>
    );
}
