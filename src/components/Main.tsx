import { Avatar, Box, Button, Flex, FormLabel, Input, Skeleton, Text } from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import ThreadCard from "./ThreadCard";
import { useThread } from "../hooks/useThread";
import { Link } from "react-router-dom";
import { fetchThreads } from "../stores/slices/threads";
import { bg } from "../styles/style";
import { useAppDispatch } from "../stores/hooks";

const Main = () => {
    const user = useSelector((state: RootState) => state.user);
    const threads = useSelector((state: RootState) => state.threads);
    const { postThread, handleChange } = useThread();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchThreads());
    }, []);

    if (user.id === 0) return null;
    return (
        <Box pt="20px" px="20px" h={"100%"} w={"100%"}>
            <Text fontSize="28" fontWeight="500" color="white" mb="2">
                Home
            </Text>
            <form>
                <Flex mb="3">
                    <Box>
                        <Link to={`/${user.username}`}>
                            <Avatar src={!user.picture ? "/src/assets/default.jpg" : user.picture} />
                        </Link>
                    </Box>
                    <Input
                        bg={bg.primary}
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
            {threads.data.map((data, index) => (
                <Skeleton isLoaded={!threads.isLoading}>
                    <ThreadCard
                        key={index}
                        id={data.id}
                        content={data.content}
                        image={data.image}
                        likes={data.likes}
                        replies={data.replies}
                        created_at={data.created_at}
                        updated_at={data.updated_at}
                        author={data.author}
                        user={user.id}
                    />
                </Skeleton>
            ))}
        </Box>
    );
};

export default Main;
