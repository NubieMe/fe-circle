import { Card, Flex, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { bg, text } from "../../../styles/style";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import SuggestCard from "./SuggestCard";
import { users } from "../../../types/user";
import API from "../../../libs/api";

const Suggestion = () => {
    const [suggestion, setSuggestion] = useState<users[]>([]);

    async function getSuggest() {
        const response = await API.get(`/suggestion`);
        setSuggestion(response.data);
    }
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        getSuggest();
    }, []);

    if (suggestion.length === 0) return null;
    return (
        <Card bg={bg.secondary} p="3" mb="3" borderRadius={20}>
            <Heading size="md" color={text.primary} bg={bg.secondary} mb={2}>
                Suggested for you
            </Heading>
            <Flex direction="column">
                {suggestion.map((data, index) => (
                    <SuggestCard
                        key={index}
                        id={data.id}
                        username={data.username}
                        name={data.name}
                        picture={data.picture}
                        bio={data.picture}
                        follow={user.following}
                    />
                ))}
            </Flex>
        </Card>
    );
};

export default Suggestion;
