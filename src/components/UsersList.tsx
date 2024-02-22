import { Avatar, Box, Button, Flex, Input, Link, Text } from "@chakra-ui/react";
import { users } from "../types/user";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../libs/api";
import { useSelector } from "react-redux";
import { RootState } from "../types/redux";
import api from "../libs/api";

const UsersList = () => {
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState<users[]>([]);
    const [filtered, setFiltered] = useState<users[]>([]);
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user.following);

    async function getUsers(): Promise<users[]> {
        const response = await axios.get(`/search/`);
        return response.data;
    }

    useEffect(() => {
        getUsers().then((val) => {
            const arr: users[] = val;
            setUsers(arr);
        });
    }, []);

    useEffect(() => {
        if (username === "") return setFiltered([]);
        const filter = users.filter((data) => {
            return (
                data.username.toLowerCase().includes(username.toLowerCase()) ||
                data.name.toLowerCase().includes(username.toLowerCase())
            );
        });
        setFiltered(filter);
    }, [username]);

    async function follow(id: number) {
        try {
            await axios.post(
                `/follow`,
                {
                    following: id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Input onChange={(e) => setUsername(e.target.value)} />
            {filtered.map((data: users, index: number) => (
                <Flex direction={"row"} key={index}>
                    <Link onClick={() => navigate(`user/${data.username}`)}>
                        <Avatar size={"sm"} src={data.picture} />
                        <Flex direction={"column"}>
                            <Text>{data.name}</Text>
                            <Text>{data.username}</Text>
                            <Text>{data.bio}</Text>
                        </Flex>
                    </Link>
                    {!user.includes(data.id) ? (
                        <Button variant={"outline"} color={"whitesmoke"} onClick={() => follow(data.id)}>
                            Follow
                        </Button>
                    ) : (
                        <Button variant={"outline"} color={"gray"}>
                            followed
                        </Button>
                    )}
                </Flex>
            ))}
        </>
    );
};

export default UsersList;
