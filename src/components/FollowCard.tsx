import { Avatar, Box, Button, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { text } from "../styles/style";
import { useSearch } from "../features/search/hooks/useSearch";

interface search {
    id: number;
    username: string;
    name: string;
    picture: string;
    bio: string;
    follow: any[];
}

export default function FollowCard(props: search) {
    const navigate = useNavigate();
    const { followSearch, unfollowSearch } = useSearch();
    return (
        <Flex direction={"row"} p={3}>
            <Box mt={1}>
                <Avatar size={"sm"} src={!props.picture ? "/src/assets/default.jpg" : props.picture} me={3} />
            </Box>
            <Link onClick={() => navigate(`user/${props.username}`)}>
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
            {!props.follow.some((val) => val.follower.id === props.id) ? (
                <Button
                    variant={"outline"}
                    color={"whitesmoke"}
                    borderRadius={20}
                    onClick={() => followSearch(props.id)}>
                    Follow
                </Button>
            ) : (
                <Button variant={"outline"} color={"gray"} borderRadius={20} onClick={() => unfollowSearch(props.id)}>
                    Followed
                </Button>
            )}
        </Flex>
    );
}
