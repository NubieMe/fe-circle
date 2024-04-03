import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppSelector } from "../../stores/hooks";
import { useFollow } from "../../hooks/useFollow";
import FollowCard from "../../components/FollowCard";

const Follows = () => {
    const follows = useAppSelector((state) => state.follow);
    const user = useAppSelector((state) => state.user);
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
                            <FollowCard key={index} data={data} follow={user.following} />
                        ))}
                    </Flex>
                </TabPanel>
                <TabPanel>
                    <Flex direction={"column"}>
                        {follows.following.map((data, index) => (
                            <FollowCard key={index} data={data} follow={user.following} />
                        ))}
                    </Flex>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default Follows;
