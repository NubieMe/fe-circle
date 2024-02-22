import { Avatar, Box, Button, Divider, Flex, FormLabel, Image, Input, Link, Stack, Text } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { FaComment, FaImage } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { text } from "../styles/style";
import { getDistanceTime } from "../utils/date";
import { useDispatch, useSelector } from "react-redux";
import { updateModal } from "../stores/slices/modal";
import axios from "../libs/api";
import { useNavigate } from "react-router-dom";
import { Thread } from "../types/thread";
import { RootState, store } from "../stores/store";
import { GET_THREADS } from "../stores/slices/thread";
import api from "../libs/api";

const Main = () => {
    const threads = useSelector((state: RootState) => state.threads);
    const user = useSelector((state: RootState) => state.user.id);
    const useAppDispatch = () => useDispatch<typeof store.dispatch>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    console.log("user", user);

    async function getThreads(id: number) {
        const response = await api.get(`/thread?id=${id}`);
        dispatch(GET_THREADS(response.data));
    }

    async function like(id: number) {
        await axios.post(
            "/like/thread",
            {
                thread: id,
            },
            {
                headers: {
                    Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                },
            }
        );
        getThreads(user);
    }

    async function unlike(id: number) {
        await axios.delete(`/unlike/thread?id=${id}`, {
            headers: {
                Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
            },
        });
        getThreads(user);
    }

    useEffect(() => {
        if (user === 0 && document.cookie) return;
        getThreads(user);
    }, [user]);

    return (
        <Box pt="20px" px="20px" h={"100%"} w={"100%"}>
            <Text fontSize="28" fontWeight="500" color="white" mb="2">
                Home
            </Text>
            <Flex mb="3">
                <Box>
                    <Avatar src="/src/assets/default.jpg" />
                </Box>
                <Input
                    placeholder="What is happening?"
                    variant="ghost"
                    color="white"
                    mt="1"
                    onClick={() => dispatch(updateModal({ open: true }))}
                />
                <FormLabel htmlFor="image" mt="3">
                    <FaImage size={25} />
                </FormLabel>
                <Input type="file" id="image" hidden />
                <Button bg="green" color="white" mt="1" borderRadius={20} px={6}>
                    Post
                </Button>
            </Flex>
            {threads.map((data, index) => (
                <Stack overflowY={"auto"} key={index}>
                    <Divider />
                    <Flex direction="row" py="2" gap="2">
                        <Avatar
                            size={"sm"}
                            src={!data.author.picture ? "src/assets/default.jpg" : data.author.picture}
                        />
                        <Flex direction="column" ms={1}>
                            <Flex direction="row" gap="2" mb="1">
                                <Link display={"flex"} flexDirection={"row"} gap={2}>
                                    <Text
                                        color={text.primary}
                                        fontWeight="semibold"
                                        textTransform={"capitalize"}
                                        textDecoration={"none"}>
                                        {data.author.name}
                                    </Text>
                                    <Text color={text.secondary}>@{data.author.username}</Text>
                                </Link>
                                <Text color={text.primary}>{getDistanceTime(data.created_at)}</Text>
                                {!data.updated_at ? null : <Text color={text.secondary}>edited</Text>}
                            </Flex>
                            <Box onClick={() => navigate(`/thread/${data.id}`)}>
                                <Text color={text.primary} mb="2">
                                    {data.content}
                                </Text>
                                {!data.image ? null : (
                                    <Flex direction={"row"} overflow={"hidden"} borderRadius={"20px"} mb={3} gap={1}>
                                        {data.image.map((img, index) => (
                                            <Box
                                                key={index}
                                                w={["8rem", "10rem", "15rem"]}
                                                h={["8rem", "10rem", "15rem"]}
                                                overflow={"hidden"}
                                                borderRadius={"20px"}
                                                mb={3}>
                                                <Image boxSize={"full"} objectFit={"cover"} src={img} />
                                            </Box>
                                        ))}
                                    </Flex>
                                )}
                            </Box>
                            <Flex direction="row">
                                <Link
                                    me={2}
                                    mt={1}
                                    onClick={() => {
                                        !data.isLiked ? like(data.id) : unlike(data.id);
                                    }}>
                                    {!data.isLiked ? <FaHeart /> : <FaHeart color="Red" />}
                                </Link>
                                <Text color={text.primary} me={3}>
                                    {data.likes}
                                </Text>
                                <Link me={2} mt={1} onClick={() => navigate(`/thread/${data.id}`)}>
                                    <FaComment />
                                </Link>
                                <Text color={text.primary}>{data.replies}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </Stack>
            ))}
        </Box>
    );
};

export default Main;
