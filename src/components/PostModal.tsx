import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Textarea,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import axios from "../libs/api";
import { updateModal } from "../stores/slices/modal";
import { useNavigate } from "react-router-dom";
import { RootState } from "../stores/store";
import { useThread } from "../hooks/useThread";

const PostModal = () => {
    const modal = useSelector((state: RootState) => state.modal.open);
    const user = useSelector((state: RootState) => state.user.id);
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [image, setImage] = useState<any>("");
    const navigate = useNavigate();
    const { handleChange, postThread } = useThread();

    async function post() {
        await axios.post(
            "/thread",
            {
                content: content,
                image: image,
            },
            {
                headers: {
                    Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        dispatch(updateModal({ open: false }));
    }

    // async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     const target = e.target as HTMLInputElement;
    //     const file = target.files![0];
    //     // setImage(file);
    // }

    return (
        <Modal isOpen={modal} onClose={() => dispatch(updateModal({ open: false }))}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>TEST</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex mb="3">
                        <Box>
                            <Avatar src="/src/assets/default.jpg" />
                        </Box>
                        <Input
                            name="content"
                            type="text"
                            placeholder="What is happening?"
                            variant="ghost"
                            color="white"
                            mt="1"
                            onChange={(e) => handleChange(e)}
                        />
                    </Flex>
                    <Flex>
                        <Divider />
                        <FormLabel htmlFor="image" mt="3">
                            <FaImage color="white" />
                        </FormLabel>
                        <input name="image" type="file" id="image" hidden onChange={(e) => handleChange(e)} />
                        <Button bg="green" color="white" mt="1" borderRadius={20} px={6} onClick={(e) => postThread(e)}>
                            Post
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PostModal;
