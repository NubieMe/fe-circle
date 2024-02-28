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
import api from "../../../libs/api";
import { text } from "../../../styles/style";
import { user } from "../../../types/user";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { FButton, UFButton } from "../../../components/Button";
import { useFollow } from "../hooks/useFollow";

const FollowList = () => {
    const [follower, setFollower] = useState<user[]>([]);
    const [following, setFollowing] = useState<user[]>([]);
    const user = useSelector((state: RootState) => state.user.id);
    const navigate = useNavigate();
    const { follow, unfollow } = useFollow();

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
                    <Flex direction={"column"} gap={3}>
                        {follower.map((data) => (
                            <Flex direction={"row"} key={data.id}>
                                <Avatar src={!data.picture ? "/src/assets/default.jpg" : data.picture} me={4} />
                                <Flex direction={"column"} alignItems={"flex-start"}>
                                    <Link onClick={() => navigate(`/${data.username}`)}>
                                        <Text textTransform={"capitalize"}>{data.name}</Text>
                                        <Text color={text.secondary}>@{data.username}</Text>
                                    </Link>
                                    <Text>{data.bio}</Text>
                                </Flex>
                                <Spacer />
                                {!following.some((fol) => fol.id === data.id) ? (
                                    <Button
                                        variant={"outline"}
                                        color={"whitesmoke"}
                                        borderRadius={20}
                                        onClick={() => (follow(data.id), getFollow())}>
                                        Follow
                                    </Button>
                                ) : (
                                    <Button
                                        variant={"outline"}
                                        color={"gray"}
                                        borderRadius={20}
                                        onClick={() => (unfollow(data.id), getFollow())}>
                                        Followed
                                    </Button>
                                )}
                            </Flex>
                        ))}
                    </Flex>
                </TabPanel>
                <TabPanel>
                    <Flex direction={"column"} gap={3}>
                        {following.map((data) => (
                            <Flex direction={"row"} key={data.id}>
                                <Avatar src={!data.picture ? "/src/assets/default.jpg" : data.picture} me={4} />
                                <Flex direction={"column"} alignItems={"flex-start"}>
                                    <Link onClick={() => navigate(`/${data.username}`)}>
                                        <Text textTransform={"capitalize"}>{data.name}</Text>
                                        <Text color={text.secondary}>@{data.username}</Text>
                                    </Link>
                                    <Text>{data.bio}</Text>
                                </Flex>
                                <Spacer />
                                <Button
                                    variant={"outline"}
                                    color={"gray"}
                                    borderRadius={20}
                                    onClick={() => (unfollow(data.id), getFollow())}>
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
