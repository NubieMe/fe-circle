import { Avatar, Box, Button, Flex, FormLabel, Image, Input, Link, Text } from "@chakra-ui/react";
import { text } from "../styles/style";
import { FaArrowLeft, FaComment, FaHeart } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "../libs/api";
import { DetailThread } from "../types/thread";
import { dateThread, getDistanceTime } from "../utils/date";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

interface Detail {
    id: string;
}

const Detail = (props: Detail) => {
    const [thread, setThread] = useState<DetailThread | null>(null);
    const [replies, setReplies] = useState<DetailThread[]>([]);
    const [content, setContent] = useState("");
    const [image, setImage] = useState();
    const user = useSelector((state: RootState) => state.user.id);
    async function getThread() {
        const response = await axios.get(`/thread/${props.id}?id=${user}`);
        console.log("res", response);

        setThread(response.data);
    }

    async function reply() {
        const response = await axios.post(
            "/reply/thread",
            {
                content,
                thread: thread!.id,
                image,
            },
            {
                headers: {
                    Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                },
            }
        );
        console.log("reply", response);
    }

    useEffect(() => {
        if (user === 0 && document.cookie) return;
        getThread();
    }, [user]);

    return (
        <Box p={5}>
            <Flex direction={"row"}>
                <Link href="/" me={3}>
                    <FaArrowLeft />
                </Link>

                <Text fontSize={20} mt={-1.5} mb={2} color={text.primary}>
                    Status
                </Text>
            </Flex>
            <Flex mb={2}>
                <Avatar size={"md"} mt={1} src="/src/assets/default.jpg" />
                <Flex ms={3} direction={"column"} mt={1}>
                    <Text fontWeight={"semibold"} textTransform={"capitalize"}>
                        {thread?.author.name}
                    </Text>
                    <Text color={text.secondary}>@{thread?.author.username}</Text>
                </Flex>
            </Flex>
            <Text>{thread?.content}</Text>
            {!thread?.image ? null : (
                <Flex
                    direction={"row"}
                    // h={["8rem", "10rem", "20rem"]}
                    overflow={"hidden"}
                    borderRadius={"20px"}
                    mt={2}
                    mb={3}
                    gap={1}>
                    {thread.image.map((img, index) => (
                        <Box
                            key={index}
                            w={["8rem", "10rem", "20rem"]}
                            h={["8rem", "10rem", "20rem"]}
                            overflow={"hidden"}
                            borderRadius={"20px"}
                            mt={2}
                            mb={3}>
                            <Image boxSize={"full"} objectFit={"cover"} src={img} />
                        </Box>
                    ))}
                </Flex>
            )}
            <Text color={text.secondary}>{dateThread(thread?.created_at)}</Text>
            <Flex direction="row" my={3}>
                <Box me={2} mt={1}>
                    <Link>{!thread?.isLiked ? <FaHeart /> : <FaHeart color="Red" />}</Link>
                </Box>
                <Text color={text.primary} me={3}>
                    {thread?.likes}
                </Text>
                <Box me={-0.5} mt={1}>
                    <FormLabel htmlFor="content">
                        <FaComment />
                    </FormLabel>
                </Box>
                <Text color={text.primary}>{thread?.replies.length}</Text>
            </Flex>

            {/* ini reply */}
            <Flex mb="3" borderY={"1px"} borderColor={"gray.600"} py={2}>
                <Box>
                    <Avatar size={"sm"} mt={2} src="/src/assets/default.jpg" />
                </Box>
                <Input
                    placeholder="Type your reply"
                    id="content"
                    variant="ghost"
                    color="white"
                    mt="1"
                    onChange={(e) => setContent(e.target.value)}
                />
                <FormLabel htmlFor="image" mt="3">
                    <FaImage size={25} />
                </FormLabel>
                <Input type="file" id="image" hidden />
                <Button bg="green" color="white" mt="1" borderRadius={20} px={6} onClick={() => reply()}>
                    Reply
                </Button>
            </Flex>
            <Flex direction={"column"}>
                {thread?.replies.map((data) => (
                    <Flex direction={"row"} key={data.id}>
                        <Box me={3}>
                            <Avatar src={!data.picture ? "/src/assets/default.jpg" : data.picture} />
                        </Box>
                        <Flex direction={"column"}>
                            <Flex direction={"row"} gap={2}>
                                <Text>{data.author.name}</Text>
                                <Text color={text.secondary}>@{data.author.username}</Text>
                                <Text>{getDistanceTime(data.created_at)}</Text>
                            </Flex>
                            <Text>{data.content}</Text>
                            {!data.image ? null : <Image src={data.image} />}
                            <Flex direction={"row"} gap={5}>
                                <Box mt={1}>
                                    <Link>{!data.isLiked ? <FaHeart /> : <FaHeart color="red" />}</Link>
                                </Box>
                                <Text color={text.primary}>{data.likes}</Text>
                                <Box mt={1}>
                                    <FaComment />
                                </Box>
                                <Text>{data.replies}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default Detail;
