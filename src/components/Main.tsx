import { Avatar, Box, Button, Flex, FormLabel, Input, Link, Text } from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import ThreadCard from "./ThreadCard";
import { useThread } from "../hooks/useThread";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const threads = useSelector((state: RootState) => state.threads.data);
    const user = useSelector((state: RootState) => state.user);
    const { getThreads, postThread, handleChange } = useThread();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.id === 0 && document.cookie) return;
        getThreads(user.id);
    }, [user.id]);

    return (
        <Box pt="20px" px="20px" h={"100%"} w={"100%"}>
            <Text fontSize="28" fontWeight="500" color="white" mb="2">
                Home
            </Text>
            <form>
                <Flex mb="3">
                    <Box>
                        <Link onClick={() => navigate(`/${user.username}`)}>
                            <Avatar src={!user.picture ? "/src/assets/default.jpg" : user.picture} />
                        </Link>
                    </Box>
                    <Input
                        placeholder="What is happening?"
                        variant="ghost"
                        name="content"
                        color="white"
                        mt="1"
                        onChange={(e) => handleChange(e)}
                    />
                    <FormLabel htmlFor="image" mt="3">
                        <FaImage size={25} />
                    </FormLabel>
                    <Input
                        type="file"
                        name="image"
                        multiple={true}
                        id="image"
                        hidden
                        onChange={(e) => handleChange(e)}
                    />
                    <Button
                        type="submit"
                        bg="green"
                        color="white"
                        mt="1"
                        borderRadius={20}
                        px={6}
                        _hover={{ bg: "green.500" }}
                        onClick={(e) => postThread(e)}>
                        Post
                    </Button>
                </Flex>
            </form>
            {threads.map((data, index) => (
                <ThreadCard
                    key={index}
                    id={data.id}
                    content={data.content}
                    image={data.image}
                    likes={data.likes}
                    isLiked={data.isLiked}
                    replies={data.replies}
                    created_at={data.created_at}
                    updated_at={data.updated_at}
                    author={data.author}
                />
            ))}
        </Box>
    );
};

export default Main;
