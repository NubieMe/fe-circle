import { Box, Skeleton, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { fetchThreads } from "../../stores/slices/threads";
import InputPost from "./components/InputPost";
import ThreadCard from "../../components/ThreadCard";

const Home = () => {
    const user = useAppSelector((state) => state.user);
    const threads = useAppSelector((state) => state.threads);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchThreads());
    }, []);

    if (user.id === 0) return null;
    return (
        <Box pt="20px" px="20px" h={"100%"} w={"100%"}>
            <Text fontSize="28" fontWeight="500" color="white" mb="2">
                Home
            </Text>
            <InputPost />
            {threads.data.map((data, index) => (
                <Skeleton isLoaded={!threads.isLoading}>
                    <ThreadCard key={index} data={data} userId={user.id} />
                </Skeleton>
            ))}
        </Box>
    );
};

export default Home;
