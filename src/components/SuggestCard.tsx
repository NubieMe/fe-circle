import { Avatar, Box, Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { bg, text } from "../styles/style";
import { useState } from "react";
import { useFollow } from "../hooks/useFollow";
import { useCurrent } from "../hooks/useCurrent";
import { search } from "./FollowCard";

export default function SuggestCard(props: search) {
    const isTrue = props.follow.some((val) => val.follower.id === props.data.id);
    const [isFollow, setIsFollow] = useState(isTrue);
    const { follow, unfollow } = useFollow();
    const { getCurrent } = useCurrent();

    return (
        <Box display="flex" flexDirection="row" bg={bg.secondary}>
            <Link to={`/${props.data.username}`}>
                <Avatar
                    size={"sm"}
                    src={!props.data.picture ? "/src/assets/default.jpg" : props.data.picture}
                    mt={3}
                    me={2}
                />
            </Link>
            <Flex direction="column" bg={bg.secondary} mt={1}>
                <Link to={`/${props.data.username}`}>
                    <Text color={text.primary} bg={bg.secondary} textTransform={"capitalize"}>
                        {props.data.name}
                    </Text>
                    <Text color={text.secondary} bg={bg.secondary}>
                        @{props.data.username}
                    </Text>
                </Link>
            </Flex>
            <Spacer bg={bg.secondary} />
            {isFollow ? (
                <Button
                    mt={1}
                    variant={"outline"}
                    color={"gray"}
                    borderRadius={20}
                    onClick={() => {
                        unfollow(props.data.id);
                        // getFollow()
                        setIsFollow((prev) => !prev);
                        getCurrent();
                    }}>
                    Followed
                </Button>
            ) : (
                <Button
                    mt={1}
                    variant={"outline"}
                    color={"whitesmoke"}
                    borderRadius={20}
                    _hover={{ bg: "#555" }}
                    onClick={() => {
                        follow(props.data.id);
                        // getFollow()
                        setIsFollow((prev) => !prev);
                        getCurrent();
                    }}>
                    Follow
                </Button>
            )}
        </Box>
    );
}
