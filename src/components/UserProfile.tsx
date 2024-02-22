import { Avatar, Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../libs/api";

export default function UserProfile() {
    const [user, setUser] = useState({});
    const params = useParams();
    const username = params.username;
    console.log("ures", username);

    async function getUser() {
        const response = await api.get(`/user/${username}`);
        console.log("user1", response);
        setUser(response.data);
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <>
            <Flex direction={"column"}>
                <Box>
                    <Image src="https://i.ibb.co/xmP2pS6/Profile.png" />
                    <Avatar src="/src/assets/default.jpg" />
                </Box>
                <Button>Edit Profile</Button>
                <Flex>
                    <Text>Nama</Text>
                    <Text>Username</Text>
                </Flex>
            </Flex>
        </>
    );
}
