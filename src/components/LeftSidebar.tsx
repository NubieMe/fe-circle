import { Box, Button, Card, Text, Heading, Link, Flex, HStack } from "@chakra-ui/react";
import { bg, text } from "../styles/style";
import { useDispatch } from "react-redux";
import { updateModal } from "../stores/slices/modal";
import { useNavigate } from "react-router-dom";
import axios from "../libs/api";
import { navbar } from "../types/navbar";
import PostModal from "./PostModal";
import { TbLogin, TbLogout } from "react-icons/tb";
import { FaSearch, FaHeart, FaPencilAlt } from "react-icons/fa";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { HiMagnifyingGlass, HiOutlineUser, HiUserCircle } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

const LeftSidebar = (props: navbar) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = document.cookie.replace("C.id=", "");
    const user = useSelector((state: RootState) => state.user.username);

    function logout() {
        axios.delete("/logout");
        document.cookie = "C.id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;;samesite=none;secure=false";
        window.location.href = "/";
    }

    return (
        <Flex h={"100%"} w={"100%"} direction="column" ps={3} pe={4} pt={3} borderRight={"1px"}>
            <Card gap="5" bg={bg.primary}>
                <HStack>
                    <Heading as="h3" fontSize={{ base: "0px", lg: "40px" }} color={text.active}>
                        circle
                    </Heading>
                    <Heading fontSize={{ base: "3xl", lg: "0px" }} textAlign={"left"} ml={"-5px"} color={text.active}>
                        C
                    </Heading>
                </HStack>
                <Box>
                    <Link display="flex" onClick={() => navigate("/")} gap="3">
                        {!props.home ? (
                            <>
                                <AiOutlineHome size={30} color={text.primary} />
                                <Text
                                    color={text.primary}
                                    fontSize="16"
                                    mt={1}
                                    fontWeight={500}
                                    display={{ base: "none", lg: "inline-block" }}>
                                    Home
                                </Text>
                            </>
                        ) : (
                            <>
                                <AiFillHome size={30} color={text.primary} />
                                <Text
                                    color={text.primary}
                                    fontSize="16"
                                    mt={1}
                                    fontWeight={600}
                                    display={{ base: "none", lg: "inline-block" }}>
                                    Home
                                </Text>
                            </>
                        )}
                    </Link>
                </Box>
                <Box>
                    <Link display="flex" onClick={() => navigate("/search")} gap="3">
                        {!props.search ? (
                            <>
                                <HiMagnifyingGlass size={30} color={text.primary} />
                                <Text
                                    color={text.primary}
                                    fontSize="16"
                                    mt={1}
                                    fontWeight={500}
                                    display={{ base: "none", lg: "inline-block" }}>
                                    Search
                                </Text>
                            </>
                        ) : (
                            <>
                                <FaSearch size={30} color={text.primary} />
                                <Text
                                    color={text.primary}
                                    fontSize="16"
                                    mt={1}
                                    fontWeight={600}
                                    display={{ base: "none", lg: "inline-block" }}>
                                    Search
                                </Text>
                            </>
                        )}
                    </Link>
                </Box>
                <Box>
                    <Link display="flex" onClick={() => navigate("/follow")} gap="3">
                        {!props.follows ? (
                            <>
                                <CiHeart size={30} color={text.primary} />
                                <Text
                                    color={text.primary}
                                    fontSize="16"
                                    mt={1}
                                    fontWeight={500}
                                    display={{ base: "none", lg: "inline-block" }}>
                                    Follows
                                </Text>
                            </>
                        ) : (
                            <>
                                <FaHeart size={30} color={text.primary} />
                                <Text
                                    color={text.primary}
                                    fontSize="16"
                                    mt={1}
                                    fontWeight={600}
                                    display={{ base: "none", lg: "inline-block" }}>
                                    Follows
                                </Text>
                            </>
                        )}
                    </Link>
                </Box>
                <Box>
                    <Link display="flex" onClick={() => navigate(`/${user}`)} gap="3">
                        {!props.profile ? (
                            <>
                                <HiOutlineUser size={30} color={text.primary} />
                                <Text
                                    color={text.primary}
                                    fontSize="16"
                                    mt={1}
                                    fontWeight={500}
                                    display={{ base: "none", lg: "inline-block" }}>
                                    Profile
                                </Text>
                            </>
                        ) : (
                            <>
                                <HiUserCircle size={30} color={text.primary} />
                                <Text
                                    color={text.primary}
                                    fontSize="16"
                                    mt={1}
                                    fontWeight={600}
                                    display={{ base: "none", lg: "inline-block" }}>
                                    Profile
                                </Text>
                            </>
                        )}
                    </Link>
                </Box>
                <PostModal />
                <Link onClick={() => dispatch(updateModal({ open: true }))}>
                    <Button
                        w={"100%"}
                        bg={"green"}
                        display={{ base: "none", lg: "inline-block" }}
                        color={text.primary}
                        borderRadius={20}>
                        Create Post
                    </Button>
                    <Text display={{ base: "inline-block", lg: "none" }} bg={text.active} mt={1}>
                        <FaPencilAlt color={text.active} size={22} />
                    </Text>
                </Link>
                <Box mt={{ base: 265, lg: 240, xl: 260 }}>
                    {token === "" ? (
                        <>
                            <Link onClick={() => navigate("/login")}>
                                <Button
                                    w={"100%"}
                                    bg={"green"}
                                    color={text.primary}
                                    borderRadius={20}
                                    display={{ base: "none", lg: "inline-block" }}
                                    onClick={() => navigate("/login")}>
                                    Login
                                </Button>
                                <Text display={{ base: "inline-block", lg: "none" }}>
                                    <TbLogin color={text.active} size={30} />
                                </Text>
                            </Link>
                        </>
                    ) : (
                        <Link display="flex" gap="3" onClick={() => logout()}>
                            <Text fontSize={"2rem"} me={{ base: "100px", lg: 0 }}>
                                <TbLogout color={text.primary} size={30} />
                            </Text>
                            <Text color="white" fontSize={{ base: "0", lg: "16" }} fontWeight={600} mt={1}>
                                Logout
                            </Text>
                        </Link>
                    )}
                </Box>
            </Card>
        </Flex>
    );
};

export default LeftSidebar;
