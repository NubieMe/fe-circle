import { Avatar, Box, Button, Card, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { avatar, bg, text } from "../styles/style";

const Suggestion = () => {
    const [Suggested, setSuggested] = useState<any[]>([]);

    useEffect(() => {
        fetch("src/mocks/suggestion.json")
            .then((res) => res.json())
            .then((result) => setSuggested(result));
    }, []);

    return (
        <Card bg={bg.secondary} p="3" mb="3">
            <Heading size="md" color={text.primary} bg={bg.secondary} mb="1">
                Suggested for you
            </Heading>
            <Flex direction="column">
                {Suggested.map((data, index) => (
                    <Box display="flex" flexDirection="row" bg={bg.secondary} key={index}>
                        <Avatar size={"sm"} src={data.picture} />
                        <Flex direction="column" bg={bg.secondary}>
                            <Text color={text.primary} bg={bg.secondary}>
                                {data.name}
                            </Text>
                            <Text color={text.secondary} bg={bg.secondary}>
                                @{data.username}
                            </Text>
                        </Flex>
                        <Spacer bg={bg.secondary} />
                        {!data.followed ? (
                            <Button variant="outline" colorScheme="whiteAlpha">
                                Follow
                            </Button>
                        ) : (
                            <Button variant="outline" colorScheme="blackAlpha">
                                Followed
                            </Button>
                        )}
                    </Box>
                ))}
            </Flex>
        </Card>
    );
};

export default Suggestion;
