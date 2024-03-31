import { Box, Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/store";
import { bg } from "../../../styles/style";
import FollowCard from "../../../components/FollowCard";
import { useSearch } from "../hooks/useSearch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_USERS } from "../../../stores/slices/users";

const UsersList = () => {
    const users = useSelector((state: RootState) => state.users.data);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
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
                {users.map((data, index: number) =>
                    data.id === user.id ? null : (
                        <FollowCard
                            key={index}
                            id={data.id}
                            username={data.username}
                            name={data.name}
                            picture={data.picture}
                            bio={data.bio}
                            follow={user.following}
                        />
                    )
                )}
            </Box>
        </>
    );
};

export default UsersList;
