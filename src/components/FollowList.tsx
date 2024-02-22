import {
    Avatar,
    Box,
    Button,
    Flex,
    Link,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../libs/api";
import { text } from "../styles/style";
import { user } from "../types/user";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

const FollowList = () => {
    const [follower, setFollower] = useState<user[]>([]);
    const [following, setFollowing] = useState<user[]>([]);
    const user = useSelector((state: RootState) => state.user.id);
    const navigate = useNavigate();

    async function getFollow() {
        const response = await api.get(`/follow/${user}`);
        setFollower(response.data.follower);
        setFollowing(response.data.following);
    }

    useEffect(() => {
        if (user === 0 && document.cookie) return;
        getFollow();
    }, [user]);

    return (
        <Tabs colorScheme="whatsapp" isFitted>
            <TabList>
                <Tab>Followers</Tab>
                <Tab>Following</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Flex direction={"column"}>
                        {follower.map((data) => (
                            <Flex direction={"row"} key={data.id}>
                                <Box>
                                    <Avatar src={!data.picture ? "/src/assets/default.jpg" : data.picture} me={4} />
                                </Box>
                                <Flex direction={"column"} alignItems={"flex-start"}>
                                    <Link>{data.name}</Link>
                                    <Link color={text.secondary}>@{data.username}</Link>
                                    <Text>{data.bio}</Text>
                                </Flex>
                                <Spacer />
                                {!following.some((fol) => fol.id === data.id) ? (
                                    <Button>Follow</Button>
                                ) : (
                                    <Button variant={"outline"} color={text.secondary}>
                                        Followed
                                    </Button>
                                )}
                            </Flex>
                        ))}
                    </Flex>
                </TabPanel>
                <TabPanel>
                    <Flex direction={"column"}>
                        {following.map((data) => (
                            <Flex direction={"row"} key={data.id}>
                                <Avatar src={!data.picture ? "/src/assets/default.jpg" : data.picture} me={4} />
                                <Flex direction={"column"} alignItems={"flex-start"}>
                                    <Link>{data.name}</Link>
                                    <Link color={text.secondary}>@{data.username}</Link>
                                    <Text>{data.bio}</Text>
                                </Flex>
                                <Spacer />
                                <Button variant={"outline"} color={text.secondary} disabled>
                                    Followed
                                </Button>
                            </Flex>
                        ))}
                    </Flex>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default FollowList;
