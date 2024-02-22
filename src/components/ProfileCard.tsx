import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { bg, text } from "../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "../libs/api";
import { updateUser } from "../stores/slices/user";
import { RootState } from "../stores/store";

const ProfileCard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const token = document.cookie.replace("C.id=", "");

    async function getCurrent() {
        const res = await axios.get("/user/me/current", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(updateUser(res.data));
    }

    useEffect(() => {
        if (!token) return;
        getCurrent();
    }, [token]);

    if (user.name === "") return null;
    return (
        <Flex
            borderRadius="20px"
            bg={bg.secondary}
            px={"20px"}
            pt={"14px"}
            mb={"20px"}
            h="345px"
            w={{ base: "0px", md: "100%", lg: "100%" }}
            mx={"auto"}
            mt={"20px"}
            direction="column"
            color={"white"}>
            <Text bg={"none"} textAlign={"left"} px={2} pb={2} fontWeight={600}>
                My Profile
            </Text>

            <Image
                src={!user.cover ? "https://i.ibb.co/xmP2pS6/Profile.png" : user.cover}
                maxW="100%"
                borderRadius="20px"
            />
            <Flex bg={"none"} flexDirection="column" mb="10px">
                <Image
                    src={!user.picture ? "/src/assets/default.jpg" : user.picture}
                    border="5px solid red"
                    ml={"20px"}
                    borderColor={bg.secondary}
                    width="68px"
                    height="68px"
                    mt="-38px"
                    borderRadius="50%"
                />
                <Box ml={"auto"} mt={{ base: "-5px", lg: "-2px", xl: "-20px" }} bg={"none"}>
                    <Button
                        w={{ lg: "90%", xl: "100%" }}
                        height={{ lg: "25px", xl: "30px" }}
                        px={4}
                        py={4}
                        bg={"none"}
                        border={"1px solid #555"}
                        borderRadius={"40px"}
                        color={"white"}
                        _hover={{ bg: "#38a169" }}>
                        Edit Profile
                    </Button>
                </Box>
                <Text fontWeight="600" color={text.primary} textAlign="left" mt={2} fontSize="xl">
                    {user.name}
                </Text>
                <Text color={text.secondary} textAlign="left" fontSize="0.9rem" fontWeight="500">
                    @{user.username}
                </Text>
            </Flex>
            <Box>
                <Text color={"white"} fontSize={"0.9rem"}>
                    {user.bio}
                </Text>
                <HStack spacing={1} fontSize={"0.8rem"} mt={1}>
                    <Text color={text.primary}>{user.following.length}</Text>
                    <Text>Following</Text>
                    <Text color={text.primary} ml={4}>
                        {user.follower.length}
                    </Text>
                    <Text>Followers</Text>
                </HStack>
            </Box>
        </Flex>
    );
};

export default ProfileCard;
