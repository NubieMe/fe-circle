import { Avatar, Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { text } from "../styles/style";
import { useState } from "react";
import { useFollow } from "../features/follow/hooks/useFollow";
import { useCurrent } from "../features/PCard/hooks/useCurrent";

export interface search {
    id: number;
    username: string;
    name: string;
    picture: string;
    bio: string;
    follow: any[];
}

export default function FollowCard(props: search) {
    const isTrue = props.follow.some((val) => val.follower.id === props.id);
    const [isFollow, setIsFollow] = useState(isTrue);
    const { follow, unfollow } = useFollow();
    const { getCurrent } = useCurrent();

    return (
        <Flex direction={"row"} p={3}>
            <Box mt={1}>
                <Avatar size={"sm"} src={!props.picture ? "/src/assets/default.jpg" : props.picture} me={3} />
            </Box>
            <Link to={`user/${props.username}`}>
                <Flex direction={"column"}>
                    <Text fontSize={15} textTransform={"capitalize"}>
                        {props.name}
                    </Text>
                    <Text fontSize={15} color={text.secondary}>
                        @{props.username}
                    </Text>
                    <Text fontSize={15}>{props.bio}</Text>
                </Flex>
            </Link>
            <Spacer />
            {!isFollow ? (
                <Button
                    variant={"outline"}
                    color={"whitesmoke"}
                    borderRadius={20}
                    onClick={() => {
                        follow(props.id)
                        setIsFollow((prev) => !prev)
                        getCurrent()}}>
                    Follow
                </Button>
            ) : (
                <Button variant={"outline"} color={"gray"} borderRadius={20} onClick={() => {
                    unfollow(props.id)
                    setIsFollow((prev) => !prev)
                    getCurrent()}}>
                    Followed
                </Button>
            )}
        </Flex>
    );
}
