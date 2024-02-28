import { Avatar, Box, Button, Flex, FormLabel, Image, Input, Link, Text } from "@chakra-ui/react";
import { text } from "../styles/style";
import { FaArrowLeft, FaComment, FaHeart } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { useEffect } from "react";
import { dateThread, getDistanceTime } from "../utils/date";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { useNavigate } from "react-router-dom";
import { useThread } from "../hooks/useThread";

interface Detail {
    id: string;
}

const Detail = (props: Detail) => {
    const thread = useSelector((state: RootState) => state.thread);
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const { getThread, postReply, likeThread, unlikeThread, likeReply, unlikeReply, handleReply } = useThread();

    useEffect(() => {
        if (user.id === 0 && document.cookie) return;
        getThread(parseInt(props.id));
    }, [user.id]);

    return (
        <Box p={5}>
            <Flex direction={"row"}>
                <Link onClick={() => navigate("/")} me={3}>
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
            <Text my={2}>{thread?.content}</Text>
            {!thread?.image ? null : (
                <Flex direction={"row"} overflow={"hidden"} borderRadius={"20px"} mt={2} mb={3} gap={1}>
                    {thread.image.map((img, index) => (
                        <Box
                            key={index}
                            w={["8rem", "10rem", "20rem"]}
                            h={["8rem", "10rem", "20rem"]}
                            overflow={"hidden"}
                            borderRadius={"20px"}>
                            <Image boxSize={"full"} objectFit={"cover"} src={img} />
                        </Box>
                    ))}
                </Flex>
            )}
            <Text color={text.secondary}>{dateThread(thread?.created_at)}</Text>
            <Flex direction="row" my={3}>
                <Box me={2} mt={1}>
                    <Link onClick={() => (!thread?.isLiked ? likeThread(thread!.id) : unlikeThread(thread!.id))}>
                        {!thread?.isLiked ? <FaHeart /> : <FaHeart color="Red" />}
                    </Link>
                </Box>
                <Text color={text.primary} me={3}>
                    {thread?.likes.length}
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
                    <Avatar size={"sm"} mt={2} src={!user.picture ? "/src/assets/default.jpg" : user.picture} />
                </Box>
                <Input
                    placeholder="Type your reply"
                    id="content"
                    name="content"
                    variant="ghost"
                    color="white"
                    mt="1"
                    onChange={(e) => handleReply(e)}
                />
                <FormLabel htmlFor="image" mt="3">
                    <FaImage size={25} />
                </FormLabel>
                <Input type="file" id="image" name="image" hidden onChange={(e) => handleReply(e)} />
                <Button
                    bg="green"
                    color="white"
                    mt="1"
                    borderRadius={20}
                    px={6}
                    _hover={{ bg: "green.500" }}
                    onClick={() => postReply(thread!.id)}>
                    Reply
                </Button>
            </Flex>
            <Flex direction={"column"}>
                {thread?.replies.map((data) => (
                    <Flex direction={"row"} key={data.id} mb={2}>
                        <Box me={4} mt={1}>
                            <Avatar
                                size={"sm"}
                                src={!data.author.picture ? "/src/assets/default.jpg" : data.author.picture}
                            />
                        </Box>
                        <Flex direction={"column"}>
                            <Flex direction={"row"} gap={2}>
                                <Text textTransform={"capitalize"}>{data.author.name}</Text>
                                <Text color={text.secondary}>@{data.author.username}</Text>
                                <Text>{getDistanceTime(data.created_at)}</Text>
                            </Flex>
                            <Text mb={2} fontSize={14}>
                                {data.content}
                            </Text>
                            {!data.image ? null : (
                                <Box
                                    w={["8rem", "10rem", "15rem"]}
                                    h={["8rem", "10rem", "15rem"]}
                                    overflow={"hidden"}
                                    borderRadius={"20px"}
                                    mb={3}>
                                    <Image boxSize={"full"} objectFit={"cover"} src={data.image} />
                                </Box>
                            )}
                            <Flex direction={"row"} gap={5}>
                                <Box mt={1} me={-3}>
                                    <Link
                                        onClick={() =>
                                            !data.isLiked
                                                ? likeReply(data.id, thread!.id)
                                                : unlikeReply(data.id, thread!.id)
                                        }>
                                        {!data.isLiked ? <FaHeart /> : <FaHeart color="red" />}
                                    </Link>
                                </Box>
                                <Text color={text.primary}>{data.likes}</Text>
                            </Flex>
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};

export default Detail;
