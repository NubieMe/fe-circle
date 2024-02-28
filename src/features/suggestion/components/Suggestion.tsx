import { Avatar, Box, Button, Card, Flex, Heading, Link, Spacer, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { bg, text } from "../../../styles/style";
import { useSuggest } from "../hooks/useSuggest";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { useNavigate } from "react-router-dom";

const Suggestion = () => {
    const { getSuggest, followSuggest } = useSuggest();
    const suggestion = useSelector((state: RootState) => state.suggestion.data);
    const user = useSelector((state: RootState) => state.user.id);
    const navigate = useNavigate();

    useEffect(() => {
        if (user === 0) return;
        getSuggest();
    }, [user]);

    if (suggestion.length === 0) return null;
    return (
        <Card bg={bg.secondary} p="3" mb="3" borderRadius={20}>
            <Heading size="md" color={text.primary} bg={bg.secondary} mb={2}>
                Suggested for you
            </Heading>
            <Flex direction="column">
                {suggestion.map((data, index) => (
                    <Box display="flex" flexDirection="row" bg={bg.secondary} key={index}>
                        <Avatar
                            size={"md"}
                            src={!data.picture ? "/src/assets/default.jpg" : data.picture}
                            mt={1}
                            me={2}
                            onClick={() => navigate(`/${data.username}`)}
                        />
                        <Flex direction="column" bg={bg.secondary} mt={1}>
                            <Link onClick={() => navigate(`/${data.username}`)}>
                                <Text color={text.primary} bg={bg.secondary} textTransform={"capitalize"}>
                                    {data.name}
                                </Text>
                                <Text color={text.secondary} bg={bg.secondary}>
                                    @{data.username}
                                </Text>
                            </Link>
                        </Flex>
                        <Spacer bg={bg.secondary} />
                        <Button
                            mt={1}
                            variant={"outline"}
                            color={"whitesmoke"}
                            borderRadius={20}
                            onClick={() => followSuggest(data.id)}>
                            Follow
                        </Button>
                    </Box>
                ))}
            </Flex>
        </Card>
    );
};

export default Suggestion;
