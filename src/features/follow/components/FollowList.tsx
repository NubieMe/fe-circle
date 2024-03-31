import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useFollow } from "../hooks/useFollow";
import FollowCard from "../../../components/FollowCard";

const FollowList = () => {
    const follows = useSelector((state: RootState) => state.follow);
    const user = useSelector((state: RootState) => state.user);
    const { getFollow } = useFollow();

    useEffect(() => {
        getFollow();
    }, []);

    return (
        <Tabs colorScheme="whatsapp" isFitted>
            <TabList>
                <Tab>Followers</Tab>
                <Tab>Following</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Flex direction={"column"}>
                        {follows.follower.map((data, index) => (
                            <FollowCard
                            key={index}
                            id={data.id}
                            username={data.username}
                            name={data.name}
                            picture={data.picture}
                            bio={data.bio}
                            follow={user.following}/>
                        ))}
                    </Flex>
                </TabPanel>
                <TabPanel>
                    <Flex direction={"column"}>
                        {follows.following.map((data, index) => (
                            <FollowCard
                            key={index}
                            id={data.id}
                            username={data.username}
                            name={data.name}
                            picture={data.picture}
                            bio={data.bio}
                            follow={user.following}/>
                        ))}
                    </Flex>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default FollowList;
