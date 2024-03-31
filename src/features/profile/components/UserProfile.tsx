import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { bg, text } from "../../../styles/style";
import ThreadCard from "../../../components/ThreadCard";
import { useProfile } from "../hooks/useProfile";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { openEdit } from "../../../stores/slices/edit";
import EditModal from "../../EditProfile/components/EditModal";
import { RiImageEditFill } from "react-icons/ri";
import { openCover } from "../../../stores/slices/cover";
import CoverModal from "./CoverModal";
import { openPicture } from "../../../stores/slices/picture";
import PictureModal from "./PictureModal";

export default function UserProfile() {
    const user = useAppSelector((state) => state.profile);
    const userLogin = useAppSelector((state) => state.user);
    console.log(userLogin.id);
    const dispatch = useAppDispatch();
    const params = useParams();
    const username = params.username;
    const { getUser } = useProfile();

    useEffect(() => {
        getUser(username!);
    }, []);

    if (userLogin.id === 0) return null;
    return (
        <Flex direction={"column"} px={4}>
            <Flex
                borderRadius="20px"
                bg={bg.secondary}
                p={"20px"}
                // py={"14px"}
                mb={"20px"}
                h="315px"
                w={{ base: "0px", md: "100%", lg: "100%" }}
                mx={"auto"}
                mt={"20px"}
                direction="column"
                color={"white"}>
                <Box w="100%" h="140px" pos={"relative"} className="container">
                    <Image
                        src={!user?.cover ? "https://i.ibb.co/xmP2pS6/Profile.png" : user.cover}
                        w="100%"
                        h="100%"
                        opacity={1}
                        sx={{ ".container:hover &": { opacity: 0.3 } }}
                        objectFit="cover"
                        borderRadius="20px"
                    />
                    {userLogin.username !== username ? null : (
                        <Box
                            sx={{ ".container:hover &": { opacity: 1 } }}
                            opacity={0}
                            w={90}
                            top={"1.65rem"}
                            left={260}
                            h={90}
                            bg={"white"}
                            borderRadius={"100%"}
                            pos={"absolute"}
                            _hover={{ cursor: "pointer" }}
                            onClick={() => dispatch(openCover(true))}
                            zIndex={1}>
                            <Flex justifyContent={"center"} alignItems={"center"} mt={"1.3rem"}>
                                <RiImageEditFill size={50} color="black" />
                            </Flex>
                        </Box>
                    )}
                </Box>
                <Flex flexDirection="column" mb="10px">
                    <Box w={"75px"} h={"35px"} zIndex={1} ml={"20px"}>
                        <Image
                            src={!user?.picture ? "/src/assets/default.jpg" : user.picture}
                            border="5px solid red"
                            // ml={"20px"}
                            borderColor={bg.secondary}
                            width="75px"
                            // bg={"rgba(0, 0, 0, 0.9)"}
                            height="75px"
                            mt="-35px"
                            className="img"
                            borderRadius="50%"
                            opacity={1}
                            zIndex={1}
                            // _hover={{ cursor: "pointer" }}
                            // sx={{ ".test:hover &": { opacity: 0 } }}
                        />
                        {userLogin.username !== username ? null : (
                            <Box
                                opacity={1}
                                // className="test"
                                // sx={{ ".contain:hover &": { opacity: 1 } }}
                                bg={"white"}
                                borderRadius={"100%"}
                                w={"30px"}
                                h={"30px"}
                                zIndex={1000}
                                mt={"-30px"}
                                // mb={"-15px"}
                                onClick={() => dispatch(openPicture(true))}
                                ms={"50px"}
                                _hover={{ cursor: "pointer" }}>
                                <Flex justifyContent={"center"} alignItems={"center"} pt={"5px"}>
                                    <RiImageEditFill size={20} color="black" />
                                </Flex>
                            </Box>
                        )}
                    </Box>
                    <Box
                        ml={"auto"}
                        mt={{ base: "-5px", lg: "-2px", xl: "-20px" }}
                        height={{ lg: "25px", xl: "30px" }}
                        bg={"none"}>
                        {userLogin.username !== username ? null : (
                            <Button
                                w={{ lg: "90%", xl: "100%" }}
                                px={4}
                                py={4}
                                bg={"none"}
                                border={"1px solid #555"}
                                borderRadius={"40px"}
                                color={"white"}
                                onClick={() => dispatch(openEdit(true))}
                                _hover={{ bg: "#555" }}>
                                Edit Profile
                            </Button>
                        )}
                    </Box>
                    <EditModal />
                    <CoverModal />
                    <PictureModal />
                    <Text
                        fontWeight="600"
                        color={text.primary}
                        bg={"none"}
                        textAlign="left"
                        // mt={2}
                        fontSize="xl"
                        textTransform={"capitalize"}>
                        {user?.name}
                    </Text>
                    <Text color={text.secondary} bg={"none"} textAlign="left" fontSize="0.9rem" fontWeight="500">
                        @{user?.username}
                    </Text>
                </Flex>
                <Box bg={"none"}>
                    <Text color={"white"} bg={"none"} fontSize={"0.9rem"}>
                        {user?.bio}
                    </Text>
                    <HStack bg={"none"} spacing={1} fontSize={"0.8rem"} mt={1}>
                        <Text color={text.primary} bg={"none"}>
                            {user?.following.length}
                        </Text>
                        <Text bg={"none"}>Following</Text>
                        <Text color={text.primary} bg={"none"} ml={4}>
                            {user?.follower.length}
                        </Text>
                        <Text bg={"none"}>Followers</Text>
                    </HStack>
                </Box>
            </Flex>
            {user?.threads.map((data, index) => (
                <ThreadCard
                    key={index}
                    id={data.id}
                    content={data.content}
                    image={data.image}
                    likes={data.likes}
                    replies={data.replies}
                    created_at={data.created_at}
                    updated_at={data.updated_at}
                    author={{ id: user?.id, name: user?.name, username: user?.username, picture: user?.picture }}
                    user={userLogin.id}
                    username={username!}
                />
            ))}
        </Flex>
    );
}
