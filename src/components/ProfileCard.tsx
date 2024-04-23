import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { bg, text } from "../styles/style";
import { useEffect } from "react";
import { useCurrent } from "../hooks/useCurrent";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../stores/hooks";

const ProfileCard = () => {
    const navigate = useNavigate();
    const userLogin = useAppSelector((state) => state.user);
    const { getCurrent } = useCurrent();

    useEffect(() => {
        getCurrent();
    }, []);

    return (
        <Flex
            borderRadius="20px"
            bg={bg.secondary}
            px={"20px"}
            pt={"14px"}
            mb={"20px"}
            h="310px"
            w={{ base: "0px", md: "100%", lg: "100%" }}
            mx={"auto"}
            mt={"20px"}
            direction="column"
            color={"white"}
        >
            <Text bg={"none"} textAlign={"left"} px={2} pb={2} fontWeight={600}>
                My Profile
            </Text>
            <Image
                src={!userLogin.cover ? "https://i.ibb.co/xmP2pS6/Profile.png" : userLogin.cover}
                maxW="100%"
                h={"7rem"}
                objectFit={"cover"}
                borderRadius="20px"
            />
            <Flex bg={"none"} flexDirection="column" mb="10px">
                <Image
                    src={!userLogin.picture ? "/src/assets/default.jpg" : userLogin.picture}
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
                        _hover={{ bg: "#555" }}
                        onClick={() => navigate(`/${userLogin.username}`)}
                    >
                        Edit Profile
                    </Button>
                </Box>
                <Text
                    fontWeight="600"
                    color={text.primary}
                    bg={"none"}
                    textAlign="left"
                    fontSize="xl"
                    textTransform={"capitalize"}
                >
                    {userLogin.name}
                </Text>
                <Text color={text.secondary} bg={"none"} textAlign="left" fontSize="0.9rem" fontWeight="500">
                    @{userLogin.username}
                </Text>
            </Flex>
            <Box bg={"none"}>
                <Text color={"white"} bg={"none"} fontSize={"0.9rem"}>
                    {userLogin.bio}
                </Text>
                <HStack bg={"none"} spacing={1} fontSize={"0.8rem"} mt={1}>
                    <Text color={text.primary} bg={"none"}>
                        {userLogin.following.length}
                    </Text>
                    <Text bg={"none"}>Following</Text>
                    <Text color={text.primary} bg={"none"} ml={4}>
                        {userLogin.follower.length}
                    </Text>
                    <Text bg={"none"}>Followers</Text>
                </HStack>
            </Box>
        </Flex>
    );
};

export default ProfileCard;
