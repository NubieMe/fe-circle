import { Avatar, Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { text } from "../styles/style";
import { useState } from "react";
import { useFollow } from "../hooks/useFollow";
import { useCurrent } from "../hooks/useCurrent";
import { users } from "../types/user";

export interface search {
    data: users;
    follow: any[];
}

export default function FollowCard(props: search) {
    const isTrue = props.follow.some((val) => val.follower.id === props.data.id);
    const [isFollow, setIsFollow] = useState(isTrue);
    const { follow, unfollow } = useFollow();
    const { getCurrent } = useCurrent();

    return (
        <Flex direction={"row"} p={3}>
            <Box mt={1}>
                <Avatar size={"sm"} src={!props.data.picture ? "/src/assets/default.jpg" : props.data.picture} me={3} />
            </Box>
            <Link to={`user/${props.data.username}`}>
                <Flex direction={"column"}>
                    <Text fontSize={15} textTransform={"capitalize"}>
                        {props.data.name}
                    </Text>
                    <Text fontSize={15} color={text.secondary}>
                        @{props.data.username}
                    </Text>
                    <Text fontSize={15}>{props.data.bio}</Text>
                </Flex>
            </Link>
            <Spacer />
            {!isFollow ? (
                <Button
                    variant={"outline"}
                    color={"whitesmoke"}
                    borderRadius={20}
                    onClick={() => {
                        follow(props.data.id);
                        setIsFollow((prev) => !prev);
                        getCurrent();
                    }}>
                    Follow
                </Button>
            ) : (
                <Button
                    variant={"outline"}
                    color={"gray"}
                    borderRadius={20}
                    onClick={() => {
                        unfollow(props.data.id);
                        setIsFollow((prev) => !prev);
                        getCurrent();
                    }}>
                    Followed
                </Button>
            )}
        </Flex>
    );
}
