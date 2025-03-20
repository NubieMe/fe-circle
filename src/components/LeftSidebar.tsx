import { Box, Button, Card, Text, Heading, Flex, Link, HStack } from "@chakra-ui/react";
import { bg, text } from "../styles/style";
import { updateModal } from "../stores/slices/modal";
import { NavLink, useNavigate } from "react-router-dom";
import PostModal from "./PostModal";
import { TbLogout } from "react-icons/tb";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { HiMagnifyingGlass, HiOutlineUser } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import API from "../libs/api";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "../stores/hooks";

const LeftSidebar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.username);

    const NAV_ITEM = [
        {
            name: "Home",
            path: "/",
            icon: <AiOutlineHome size={30} color={text.primary} />,
        },
        {
            name: "Search",
            path: "/search",
            icon: <HiMagnifyingGlass size={30} color={text.primary} />,
        },
        {
            name: "Follows",
            path: "/follow",
            icon: <CiHeart size={30} color={text.primary} />,
        },
        {
            name: "Profile",
            path: `/${user}`,
            icon: <HiOutlineUser size={30} color={text.primary} />,
        },
    ];

    function logout() {
        API.delete("/logout");
        Cookies.set("C.id", "", { expires: 0 });
        window.location.href = "/";
    }

    return (
        <Flex h={"100%"} w={"100%"} direction="column" ps={3} pe={4} pt={3} borderRight={"1px"}>
            <Card gap="5" bg={bg.primary} ms="1">
                <HStack>
                    <Link onClick={() => navigate("/")}>
                        <Heading as="h3" fontSize={{ base: "0px", lg: "40px" }} color={text.active}>
                            circle
                        </Heading>
                        <Heading
                            fontSize={{ base: "3xl", lg: "0px" }}
                            textAlign={"left"}
                            ml={"5px"}
                            color={text.active}>
                            C
                        </Heading>
                    </Link>
                </HStack>
                {NAV_ITEM.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "black",
                                viewTransitionName: isTransitioning ? "slide" : "",
                            };
                        }}>
                        <Flex gap="3">
                            {item.icon}
                            <Text color={text.primary} mt={1} display={{ base: "none", lg: "inline-block" }}>
                                {item.name}
                            </Text>
                        </Flex>
                    </NavLink>
                ))}
                <PostModal />
                <Button
                    w={"100%"}
                    ml="-5px"
                    bg={"green"}
                    color={text.primary}
                    borderRadius={20}
                    onClick={() => dispatch(updateModal({ open: true }))}
                    _hover={{ bg: "green.500" }}>
                    <Text display={{ base: "none", lg: "inline-block" }}>Create Post</Text>
                    <Text display={{ base: "inline-block", lg: "none" }} mt={1}>
                        <FaPencilAlt color={text.primary} size={22} />
                    </Text>
                </Button>
            </Card>
            <Card bgColor={bg.primary} mb={4}>
                <Box>
                    <Link display="flex" gap="3" onClick={() => logout()}>
                        <Text fontSize={"2rem"} me={{ base: "100px", lg: 0 }}>
                            <TbLogout color={text.primary} size={30} />
                        </Text>
                        <Text color="white" fontSize={{ base: "0", lg: "16" }} fontWeight={600} mt={1}>
                            Logout
                        </Text>
                    </Link>
                </Box>
            </Card>
        </Flex>
    );
};

export default LeftSidebar;
