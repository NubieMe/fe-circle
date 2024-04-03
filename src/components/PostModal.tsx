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
import { RootState } from "../stores/store";
import { usePost } from "../hooks/usePost";
import { bg } from "../styles/style";

const PostModal = () => {
    const modal = useSelector((state: RootState) => state.modal.open);
    const dispatch = useDispatch();
    const { postModal, handleModal } = usePost();

    return (
        <Modal isOpen={modal} onClose={() => dispatch(updateModal({ open: false }))}>
            <ModalOverlay />
            <ModalContent bg={bg.primary}>
                <ModalHeader>Post Thread</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form>
                        <Flex mb="3">
                            <Box>
                                <Avatar src="/src/assets/default.jpg" />
                            </Box>
                            <Input
                                name="content"
                                type="textbox"
                                placeholder="What is happening?"
                                variant="ghost"
                                color="white"
                                mt="1"
                                bg={bg.primary}
                                onChange={(e) => handleModal(e)}
                            />
                        </Flex>
                        <Divider />
                        <Flex justifyContent="end" mt="2">
                            <FormLabel htmlFor="img" mt="4">
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
