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
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updateModal } from "../stores/slices/modal";
import { useNavigate } from "react-router-dom";
import { RootState } from "../stores/store";
import { useThread } from "../hooks/useThread";
import { useState } from "react";
import api from "../libs/api";

const PostModal = () => {
    const user = useSelector((state: RootState) => state.user.id);
    const modal = useSelector((state: RootState) => state.modal.open);
    // const [content, setContent] = useState("");
    // const [img, setImg] = useState<FileList | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getThreads, postModal, handleModal } = useThread();
    // console.log("img", img);

    // async function post(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
    //     e.preventDefault();
    //     await api.post(
    //         "/thread",
    //         {
    //             content: content,
    //             image: img,
    //         },
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${document.cookie.replace("C.id=", "")}`,
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         }
    //     );
    //     dispatch(updateModal({ open: false }));
    //     navigate("/");
    //     getThreads(user);
    // }

    return (
        <Modal isOpen={modal} onClose={() => dispatch(updateModal({ open: false }))}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>TEST</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
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
                                onChange={(e) => handleModal(e)}
                            />
                        </Flex>
                        <Flex>
                            <Divider />
                            <FormLabel htmlFor="img" mt="3">
                                <FaImage color="white" />
                            </FormLabel>
                            <Input
                                name="image"
                                type="file"
                                multiple={true}
                                id="img"
                                hidden
                                onChange={(e) => handleModal(e)}
                            />
                            <Button
                                bg="green"
                                color="white"
                                mt="1"
                                borderRadius={20}
                                px={6}
                                onClick={(e) => {
                                    postModal(e);
                                }}>
                                Post
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PostModal;
