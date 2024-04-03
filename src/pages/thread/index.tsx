import { Avatar, Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { text } from "../../styles/style";
import { FaArrowLeft, FaComment, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { dateThread } from "../../utils/date";
import { useNavigate, useParams } from "react-router-dom";
import { useReply } from "../../hooks/useReply";
import { useAppSelector } from "../../stores/hooks";
import InputReply from "./components/InputReply";
import ReplyCard from "./components/ReplyCard";

const Thread = () => {
    const params = useParams();
    const id = params.id;
    const thread = useAppSelector((state) => state.thread);
    const user = useAppSelector((state) => state.user);
    if (user.id === 0) return null;
    const isTrue = thread.likes.some((val) => val.author.id === user.id);
    const [isLiked, setIsLiked] = useState(isTrue);
    const [likes, setLikes] = useState(thread.likes.length);
    const navigate = useNavigate();
    const { getThread, likeThread, unlikeThread } = useReply();

    useEffect(() => {
        getThread(parseInt(id!));
    }, []);

    return (
        <Box p={5}>
            <Flex direction={"row"}>
                <Link onClick={() => navigate(-1)} me={3}>
                    <FaArrowLeft />
                </Link>

                <Text fontSize={20} mt={-1.5} mb={2} color={text.primary}>
                    Status
                </Text>
            </Flex>
            <Flex mb={2}>
                <Avatar
                    size={"md"}
                    mt={1}
                    src={!thread.author.picture ? "/src/assets/default.jpg" : thread.author.picture}
                />
                <Flex ms={3} direction={"column"} mt={1}>
                    <Text fontWeight={"semibold"} textTransform={"capitalize"}>
                        {thread?.author.name}
                    </Text>
                    <Text color={text.secondary}>@{thread?.author.username}</Text>
                </Flex>
            </Flex>
            <Text my={2}>{thread?.content}</Text>
            {thread?.image && (
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
                    <Link
                        onClick={() =>
                            !isLiked
                                ? (likeThread(thread!.id), setIsLiked((prev) => !prev), setLikes((prev) => prev + 1))
                                : (unlikeThread(thread!.id), setIsLiked((prev) => !prev), setLikes((prev) => prev - 1))
                        }>
                        {!isLiked ? <FaHeart /> : <FaHeart color="Red" />}
                    </Link>
                </Box>
                <Text color={text.primary} me={3}>
                    {likes}
                </Text>
                <Box me={2} mt={1}>
                    <FaComment />
                </Box>
                <Text color={text.primary}>{thread?.replies.length}</Text>
            </Flex>

            {/* ini reply */}
            <InputReply threadId={Number(id!)} picture={user.picture} username={user.username} />
            <Flex direction={"column"}>
                {thread?.replies.map((data, index) => (
                    <ReplyCard key={index} data={data} threadId={Number(id!)} userId={user.id} />
                ))}
            </Flex>
        </Box>
    );
};

export default Thread;
