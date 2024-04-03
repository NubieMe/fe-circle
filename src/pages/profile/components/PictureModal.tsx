import {
    Button,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { bg } from "../../../styles/style";
import API from "../../../libs/api";
import { useState } from "react";
import { openPicture } from "../../../stores/slices/picture";
import { fetchProfile } from "../../../stores/slices/userProfile";

const PictureModal = () => {
    const modal = useAppSelector((state) => state.picture.open);
    const user = useAppSelector((state) => state.user);
    const [picture, setPicture] = useState<File>();
    const dispatch = useAppDispatch();
    const toast = useToast();

    async function updatePicture() {
        const promise = new Promise(async (res, rej) => {
            try {
                await API.patch(
                    `/upload/picture/${user.id}`,
                    {
                        picture,
                    },
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                res("ok");
            } catch (error) {
                rej();
            }
        });
        dispatch(openPicture(false));
        toast.promise(promise, {
            success: { title: "Success", description: "update profile success!" },
            error: { title: "Error", description: "update profile failed!" },
            loading: { title: "Please wait", description: "updating profile..." },
        });
        dispatch(fetchProfile(user.username));
    }

    return (
        <Modal isOpen={modal} onClose={() => dispatch(openPicture(false))}>
            <ModalOverlay />
            <ModalContent bg={bg.primary}>
                <ModalHeader>Edit Picture</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <Input
                            type="file"
                            style={{ borderColor: "#fff" }}
                            onChange={(e) => setPicture(e.target.files![0])}
                        />
                        <Button
                            bg="green"
                            color="white"
                            my="3"
                            borderRadius={20}
                            px={6}
                            _hover={{ bg: "green.500" }}
                            onClick={() => updatePicture()}>
                            Save
                        </Button>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default PictureModal;
