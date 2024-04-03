import { Avatar, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useReply } from "../../../hooks/useReply";
import { FaImage } from "react-icons/fa6";
import { bg } from "../../../styles/style";

interface IReply {
    threadId: number;
    username: string;
    picture: string | null;
}

const InputReply = (props: IReply) => {
    const { reply, handleReply, postReply } = useReply();

    return (
        <form onSubmit={(e) => postReply(e, props.threadId)}>
            <Flex mb="3" borderY={"1px"} borderColor={"gray.600"} py={2}>
                <Link to={`/${props.username}`}>
                    <Avatar size={"sm"} mt={2} src={!props.picture ? "/src/assets/default.jpg" : props.picture} />
                </Link>
                <Input
                    placeholder="Type your reply"
                    id="content"
                    name="content"
                    variant="ghost"
                    color="white"
                    value={reply.content}
                    mt="1"
                    bg={bg.primary}
                    onChange={(e) => handleReply(e)}
                />
                <FormLabel _hover={{ cursor: "pointer" }} htmlFor="image" mt="3">
                    <FaImage size={25} />
                </FormLabel>
                <Input
                    type="file"
                    id="image"
                    name="image"
                    // value={reply.image}
                    hidden
                    onChange={(e) => handleReply(e)}
                />
                <Button
                    bg="green"
                    color="white"
                    type="submit"
                    mt="1"
                    borderRadius={20}
                    px={6}
                    _hover={{ bg: "green.500" }}>
                    Reply
                </Button>
            </Flex>
        </form>
    );
};

export default InputReply;
