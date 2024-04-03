import {
    Avatar,
    Box,
    Flex,
    IconButton,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa6";
import { bg, text } from "../../../styles/style";
import { HiDotsHorizontal } from "react-icons/hi";
import { useReply } from "../../../hooks/useReply";
import { Reply } from "../../../types/thread";
import { getDistanceTime } from "../../../utils/date";
import { useState } from "react";

interface ReplyCard {
    data: Reply;
    threadId: number;
    userId: number;
}

const ReplyCard = (props: ReplyCard) => {
    const isTrue = props.data.likes.some((val) => val.author.id === props.userId);
    const [isLiked, setIsLiked] = useState(isTrue);
    const [likes, setLikes] = useState(props.data.likes.length);
    const { likeReply, unlikeReply, deleteReply } = useReply();

    return (
        <Flex direction={"row"} key={props.data.id} mb={2}>
            <Box me={4} mt={1}>
                <Avatar
                    size={"sm"}
                    src={!props.data.author.picture ? "/src/assets/default.jpg" : props.data.author.picture}
                />
            </Box>
            <Flex direction={"column"}>
                <Flex direction={"row"} gap={2}>
                    <Text textTransform={"capitalize"}>{props.data.author.name}</Text>
                    <Text color={text.secondary}>@{props.data.author.username}</Text>
                    <Text>{getDistanceTime(props.data.created_at)}</Text>
                </Flex>
                <Text mb={2} fontSize={16} mt={3}>
                    {props.data.content}
                </Text>
                {!props.data.image ? null : (
                    <Box
                        w={["8rem", "10rem", "15rem"]}
                        h={["8rem", "10rem", "15rem"]}
                        overflow={"hidden"}
                        borderRadius={"20px"}
                        mb={3}>
                        <Image boxSize={"full"} objectFit={"cover"} src={props.data.image} />
                    </Box>
                )}
                <Flex direction={"row"} gap={5}>
                    <Box mt={1} me={-3}>
                        <Link
                            onClick={() => {
                                !isLiked
                                    ? (likeReply(props.data.id, props.threadId),
                                      setLikes((prev) => prev + 1),
                                      setIsLiked((prev) => !prev))
                                    : (unlikeReply(props.data.id, props.threadId),
                                      setLikes((prev) => prev - 1),
                                      setIsLiked((prev) => !prev));
                            }}>
                            {!isLiked ? <FaHeart /> : <FaHeart color="red" />}
                        </Link>
                    </Box>
                    <Text color={text.primary}>{likes}</Text>
                </Flex>
            </Flex>
            <Spacer />
            {props.data.author.id !== props.userId ? null : (
                <Menu isLazy>
                    <MenuButton
                        mt={-2}
                        bg={bg.primary}
                        _hover={{ bg: "none" }}
                        _active={{ bg: "none" }}
                        p={"none"}
                        as={IconButton}
                        aria-label="Options"
                        icon={<HiDotsHorizontal color={text.primary} />}
                    />
                    <MenuList bg={bg.secondary}>
                        <MenuItem
                            bg={bg.secondary}
                            _hover={{ bg: "#555" }}
                            onClick={() => deleteReply(props.data.id, props.threadId)}>
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            )}
        </Flex>
    );
};

export default ReplyCard;
