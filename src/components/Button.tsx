import { Button } from "@chakra-ui/react";

export function FButton({ onClick }: any) {
    return (
        <Button variant={"outline"} color={"whitesmoke"} borderRadius={20} onClick={() => onClick}>
            Follow
        </Button>
    );
}

export function UFButton({ onClick }: any) {
    return (
        <Button variant={"outline"} color={"gray"} borderRadius={20} onClick={() => onClick}>
            Followed
        </Button>
    );
}
