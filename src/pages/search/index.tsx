import { Box, Input } from "@chakra-ui/react";
import { bg } from "../../styles/style";
import FollowCard from "../../components/FollowCard";
import { useSearch } from "../../hooks/useSearch";
import { useEffect } from "react";
import { GET_USERS } from "../../stores/slices/users";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";

const Search = () => {
    const users = useAppSelector((state) => state.users.data);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const { input, setInput, search } = useSearch();

    useEffect(() => {
        if (!input) {
            dispatch(GET_USERS({ data: [] }));
        } else {
            search();
        }
    }, [input]);

    return (
        <>
            <Box p={3}>
                <Input
                    placeholder="Search"
                    onChange={(e) => setInput(e.target.value)}
                    bg={bg.secondary}
                    borderRadius={20}
                    border={"1px solid #555"}
                />
                {users.map(
                    (data, index: number) =>
                        data.id !== user.id && <FollowCard key={index} data={data} follow={user.following} />
                )}
            </Box>
        </>
    );
};

export default Search;
