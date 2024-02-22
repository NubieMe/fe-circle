import { useSelector } from "react-redux";
import { Alert, AlertDescription, Button, Input, Stack } from "@chakra-ui/react";
import { text } from "../../../styles/style";
import { RootState } from "../../../stores/store";
import { useRegister } from "../hooks/useRegister";

export default function FormRegister() {
    const { handleChange, register } = useRegister();
    const message = useSelector((state: RootState) => state.msgRegister.message);
    return (
        <>
            {!message ? null : (
                <Alert status="error" borderRadius={5} mb={3}>
                    <AlertDescription bg={"none"} color={"black"}>
                        {message}
                    </AlertDescription>
                </Alert>
            )}
            <form onSubmit={(e) => register(e)}>
                <Stack spacing={3} mb={3}>
                    <Input onChange={handleChange} name="name" placeholder="Name*" border={"1px solid #555"} />
                    <Input onChange={handleChange} name="username" placeholder="Username*" border={"1px solid #555"} />
                    <Input onChange={handleChange} name="email" placeholder="Email*" border={"1px solid #555"} />
                    <Input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        placeholder="Password*"
                        border={"1px solid #555"}
                    />
                </Stack>
                <Button type="submit" w={"100%"} bgColor={text.active} color={text.primary} mb={3} borderRadius={20}>
                    Register
                </Button>
            </form>
        </>
    );
}
