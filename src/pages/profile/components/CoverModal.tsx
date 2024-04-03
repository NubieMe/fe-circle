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
import { openCover } from "../../../stores/slices/cover";
import { bg } from "../../../styles/style";
import API from "../../../libs/api";
import { useState } from "react";
import { fetchProfile } from "../../../stores/slices/userProfile";

const CoverModal = () => {
    const modal = useAppSelector((state) => state.cover.open);
    const user = useAppSelector((state) => state.user);
    const [cover, setCover] = useState<File>();
    const dispatch = useAppDispatch();
    const toast = useToast();

    async function updateCover() {
        const promise = new Promise(async (res, rej) => {
            try {
                await API.patch(
                    `/upload/cover/${user.id}`,
                    {
                        cover,
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
        dispatch(openCover(false));
        toast.promise(promise, {
            success: { title: "Success", description: "update profile's cover success!" },
            error: { title: "Error", description: "update profile's cover failed!" },
            loading: { title: "Please wait", description: "updating profile's cover..." },
        });
        dispatch(fetchProfile(user.username));
    }

    return (
        <Modal isOpen={modal} onClose={() => dispatch(openCover(false))}>
            <ModalOverlay />
            <ModalContent bg={bg.primary}>
                <ModalHeader>Edit Cover</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <Input
                            type="file"
                            style={{ borderColor: "#fff" }}
                            onChange={(e) => setCover(e.target.files![0])}
                        />
                        <Button
                            bg="green"
                            color="white"
                            my="3"
                            borderRadius={20}
                            px={6}
                            _hover={{ bg: "green.500" }}
                            onClick={() => updateCover()}>
                            Save
                        </Button>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CoverModal;
