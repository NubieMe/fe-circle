import { Box, Button, Flex, HStack, Image, Skeleton, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { bg, text } from "../../styles/style";
import { openCover } from "../../stores/slices/cover";
import { RiImageEditFill } from "react-icons/ri";
import { openPicture } from "../../stores/slices/picture";
import EditModal from "./components/EditModal";
import CoverModal from "./components/CoverModal";
import PictureModal from "./components/PictureModal";
import { openEdit } from "../../stores/slices/edit";
import ThreadCard from "../../components/ThreadCard";
import { fetchProfile } from "../../stores/slices/userProfile";

export default function Profile() {
    const params = useParams();
    const username = params.username;
    const user = useAppSelector((state) => state.profile);
    const userLogin = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfile(username!));
    }, [username, user.data.picture, user.data.cover]);

    if (userLogin.id === 0) return null;
    return (
        <Flex direction={"column"} px={4}>
            <Flex
                borderRadius="20px"
                bg={bg.secondary}
                p={"20px"}
                mb={"20px"}
                h="315px"
                w={{ base: "0px", md: "100%", lg: "100%" }}
                mx={"auto"}
                mt={"20px"}
                direction="column"
                color={"white"}>
                <Skeleton isLoaded={!user.isLoading} w="100%" h="140px" pos={"relative"} className="container">
                    <Image
                        src={!user?.data.cover ? "https://i.ibb.co/xmP2pS6/Profile.png" : user.data.cover}
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
                </Skeleton>
                <Flex flexDirection="column" mb="10px">
                    <Skeleton isLoaded={!user.isLoading} w={"75px"} h={"35px"} zIndex={1} ml={"20px"}>
                        <Image
                            src={!user.data.picture ? "/src/assets/default.jpg" : user.data.picture}
                            border="5px solid red"
                            borderColor={bg.secondary}
                            width="75px"
                            // bg={"rgba(0, 0, 0, 0.9)"}
                            height="75px"
                            mt="-35px"
                            className="img"
                            borderRadius="50%"
                            opacity={1}
                            zIndex={1}
                        />
                        {userLogin.username !== username ? null : (
                            <Box
                                opacity={1}
                                bg={"white"}
                                borderRadius={"100%"}
                                w={"30px"}
                                h={"30px"}
                                zIndex={1000}
                                mt={"-30px"}
                                onClick={() => dispatch(openPicture(true))}
                                ms={"50px"}
                                _hover={{ cursor: "pointer" }}>
                                <Flex justifyContent={"center"} alignItems={"center"} pt={"5px"}>
                                    <RiImageEditFill size={20} color="black" />
                                </Flex>
                            </Box>
                        )}
                    </Skeleton>
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
                    <Skeleton isLoaded={!user.isLoading}>
                        <Text
                            fontWeight="600"
                            color={text.primary}
                            bg={"none"}
                            textAlign="left"
                            fontSize="xl"
                            textTransform={"capitalize"}>
                            {user?.data.name}
                        </Text>
                        <Text color={text.secondary} bg={"none"} textAlign="left" fontSize="0.9rem" fontWeight="500">
                            @{user?.data.username}
                        </Text>
                    </Skeleton>
                </Flex>
                <Skeleton isLoaded={!user.isLoading} bg={"none"}>
                    <Text color={"white"} bg={"none"} fontSize={"0.9rem"}>
                        {user?.data.bio}
                    </Text>
                    <HStack bg={"none"} spacing={1} fontSize={"0.8rem"} mt={1}>
                        <Text color={text.primary} bg={"none"}>
                            {user?.data.following.length}
                        </Text>
                        <Text bg={"none"}>Following</Text>
                        <Text color={text.primary} bg={"none"} ml={4}>
                            {user?.data.follower.length}
                        </Text>
                        <Text bg={"none"}>Followers</Text>
                    </HStack>
                </Skeleton>
            </Flex>
            {user?.data.threads.map((data, index) => (
                <Skeleton isLoaded={!user.isLoading}>
                    <ThreadCard key={index} data={data} userId={userLogin.id} />
                </Skeleton>
            ))}
        </Flex>
    );
}
