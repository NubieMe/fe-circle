import {
    Button,
    Checkbox,
    // Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react";
import { openEdit } from "../../../stores/slices/edit";
import { bg } from "../../../styles/style";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { useState } from "react";
import API from "../../../libs/api";
import { fetchProfile } from "../../../stores/slices/userProfile";

interface edit {
    username: string;
    name: string;
    bio?: string | null;
    password?: string;
}

export default function EditModal() {
    const modal = useAppSelector((state) => state.edit.open);
    const user = useAppSelector((state) => state.user);
    const val = !user.bio ? "" : user.bio;
    const [username, setUsername] = useState(user.username);
    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(val);
    const [password, setPassword] = useState("");
    const [editPass, setEditPass] = useState(false);
    const dispatch = useAppDispatch();
    const toast = useToast();
    let data: edit;

    async function updateUser() {
        if (password === "") {
            data = {
                username,
                name,
                bio,
            };
        } else {
            data = {
                username,
                name,
                bio,
                password,
            };
        }
        const promise = new Promise(async (res, rej) => {
            try {
                await API.patch(`/user/${user.id}`, data);
                res("ok");
            } catch (error) {
                rej();
            }
        });
        dispatch(openEdit(false));
        toast.promise(promise, {
            success: { title: "Success", description: "update profile success!" },
            error: { title: "Error", description: "update profile failed!" },
            loading: { title: "Please wait", description: "updating profile..." },
        });
        dispatch(fetchProfile(user.username));
    }

    return (
        <>
            <Modal isOpen={modal} onClose={() => dispatch(openEdit(false))}>
                <ModalOverlay />
                <ModalContent bg={bg.primary} h="30rem" minW="40rem">
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input
                                id="username"
                                placeholder="Username"
                                mb="3"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input
                                id="name"
                                placeholder="Name"
                                mb="3"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            <FormLabel htmlFor="bio">Bio</FormLabel>
                            <Input
                                id="bio"
                                placeholder="Bio"
                                mb="3"
                                onChange={(e) => setBio(e.target.value)}
                                value={bio}
                            />
                            <Flex>
                                <Checkbox id="edit" onChange={() => setEditPass(!editPass)} mt="1" mb="3" me="2" />
                                <FormLabel htmlFor="edit">Edit Password</FormLabel>
                            </Flex>
                            {editPass && (
                                <Input placeholder="Password" mb="3" onChange={(e) => setPassword(e.target.value)} />
                            )}
                            {/* <Divider /> */}
                            <Flex justifyContent={"end"} alignItems={"end"} mt="2">
                                <Button
                                    bottom={150}
                                    position={"fixed"}
                                    bg="green"
                                    color="white"
                                    mt="1"
                                    borderRadius={20}
                                    px={6}
                                    _hover={{ bg: "green.500" }}
                                    onClick={() => updateUser()}
                                >
                                    Save
                                </Button>
                            </Flex>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
