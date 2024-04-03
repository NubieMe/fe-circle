import {
    Avatar,
    Box,
    Divider,
    Flex,
    IconButton,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Stack,
    Text,
} from "@chakra-ui/react";
import { getDistanceTime } from "../utils/date";
import { useNavigate } from "react-router-dom";
import { bg, text } from "../styles/style";
import { useThread } from "../hooks/useThread";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { HiDotsHorizontal } from "react-icons/hi";
import { Thread } from "../types/thread";
import API from "../libs/api";
import { useAppDispatch } from "../stores/hooks";
import { fetchThreads } from "../stores/slices/threads";
import { useState } from "react";

interface Data {
    data: Thread;
    userId: number;
}
export default function ThreadCard(props: Data) {
    const isTrue = props.data.likes.some((val) => val.author.id === props.userId);
    const [isLiked, setIsLiked] = useState(isTrue);
    const [likes, setLikes] = useState(props.data.likes.length);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { like, unlike } = useThread();

    async function delThread(id: number) {
        if (!confirm("Are you sure you want to delete this thread?")) {
            return false;
        }
        await API.delete(`/thread/${id}`);
        dispatch(fetchThreads());
    }

    return (
        <>
            <Stack overflowY={"auto"}>
                <Divider />
                <Flex direction="row" py="2" gap="2">
                    <Link onClick={() => navigate(`/${props.data.author.username}`)}>
                        <Avatar
                            size={"sm"}
                            src={!props.data.author.picture ? "src/assets/default.jpg" : props.data.author.picture}
                        />
                    </Link>
                    <Flex direction="column" ms={1}>
                        <Flex direction="row" gap="2" mb="1">
                            <Link
                                display={"flex"}
                                flexDirection={"row"}
                                gap={2}
                                onClick={() => navigate(`/${props.data.author.username}`)}>
                                <Text
                                    color={text.primary}
                                    fontWeight="semibold"
                                    textTransform={"capitalize"}
                                    textDecoration={"none"}>
                                    {props.data.author.name}
                                </Text>
                                <Text color={text.secondary}>@{props.data.author.username}</Text>
                            </Link>
                            <Text color={text.primary}>{getDistanceTime(props.data.created_at)}</Text>
                            {!props.data.updated_at ? null : <Text color={text.secondary}>edited</Text>}
                        </Flex>
                        <Box onClick={() => navigate(`/thread/${props.data.id}`)}>
                            <Text color={text.primary} mb="2">
                                {props.data.content}
                            </Text>
                            {!props.data.image ? null : (
                                <Flex direction={"row"} overflow={"hidden"} borderRadius={"20px"} mb={3} gap={1}>
                                    {props.data.image.map((img, index) => (
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
                                    !isLiked
                                        ? (like(props.data.id),
                                          setLikes((prev) => prev + 1),
                                          setIsLiked((prev) => !prev))
                                        : (unlike(props.data.id),
                                          setLikes((prev) => prev - 1),
                                          setIsLiked((prev) => !prev));
                                }}>
                                {!isLiked ? <FaHeart /> : <FaHeart color="Red" />}
                            </Link>
                            <Text color={text.primary} me={3}>
                                {likes}
                            </Text>
                            <Link me={2} mt={1} onClick={() => navigate(`/thread/${props.data.id}`)}>
                                <FaComment />
                            </Link>
                            <Text color={text.primary}>{props.data.replies!.length}</Text>
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
                                    onClick={() => delThread(props.data.id)}>
                                    Delete
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </Flex>
            </Stack>
        </>
    );
}
