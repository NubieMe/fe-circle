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
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { fetchThreads } from "../stores/slices/threads";
import { useState } from "react";

export default function ThreadCard(props: Thread) {
    const isTrue = props.likes.some((val) => val.author.id === props.user);
    const [isLiked, setIsLiked] = useState(isTrue);
    const [likes, setLikes] = useState(props.likes.length);
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
                    <Link onClick={() => navigate(`/${props.author.username}`)}>
                        <Avatar
                            size={"sm"}
                            src={!props.author.picture ? "src/assets/default.jpg" : props.author.picture}
                        />
                    </Link>
                    <Flex direction="column" ms={1}>
                        <Flex direction="row" gap="2" mb="1">
                            <Link
                                display={"flex"}
                                flexDirection={"row"}
                                gap={2}
                                onClick={() => navigate(`/${props.author.username}`)}>
                                <Text
                                    color={text.primary}
                                    fontWeight="semibold"
                                    textTransform={"capitalize"}
                                    textDecoration={"none"}>
                                    {props.author.name}
                                </Text>
                                <Text color={text.secondary}>@{props.author.username}</Text>
                            </Link>
                            <Text color={text.primary}>{getDistanceTime(props.created_at)}</Text>
                            {!props.updated_at ? null : <Text color={text.secondary}>edited</Text>}
                        </Flex>
                        <Box onClick={() => navigate(`/thread/${props.id}`)}>
                            <Text color={text.primary} mb="2">
                                {props.content}
                            </Text>
                            {!props.image ? null : (
                                <Flex direction={"row"} overflow={"hidden"} borderRadius={"20px"} mb={3} gap={1}>
                                    {props.image.map((img, index) => (
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
                                        ? (like(props.id), setLikes((prev) => prev + 1), setIsLiked((prev) => !prev))
                                        : (unlike(props.id), setLikes((prev) => prev - 1), setIsLiked((prev) => !prev));
                                }}>
                                {!isLiked ? <FaHeart /> : <FaHeart color="Red" />}
                            </Link>
                            <Text color={text.primary} me={3}>
                                {likes}
                            </Text>
                            <Link me={2} mt={1} onClick={() => navigate(`/thread/${props.id}`)}>
                                <FaComment />
                            </Link>
                            <Text color={text.primary}>{props.replies.length}</Text>
                        </Flex>
                    </Flex>
                    <Spacer />
                    {props.author.id !== props.user ? null : (
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
                                {/* <MenuItem>
                                        Update
                                    </MenuItem> */}
                                <MenuItem bg={bg.secondary} _hover={{ bg: "#555" }} onClick={() => delThread(props.id)}>
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
