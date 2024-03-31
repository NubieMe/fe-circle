import {
    Button,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { bg } from "../../../styles/style";
import API from "../../../libs/api";
import { useState } from "react";
import { openPicture } from "../../../stores/slices/picture";
import { useProfile } from "../hooks/useProfile";

const PictureModal = () => {
    const modal = useAppSelector((state) => state.picture.open);
    const user = useAppSelector((state) => state.user);
    const [picture, setPicture] = useState<File>();
    const dispatch = useAppDispatch();
    const { getUser } = useProfile();

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
        getUser(user.username);
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
                            type="submit"
                            variant={"outline"}
                            color={"white"}
                            _hover={{ bg: "#555" }}
                            rounded={"full"}
                            colorScheme="gray"
                            onClick={updatePicture}>
                            Upload
                        </Button>
                    </FormControl>
                </ModalBody>

                <ModalFooter></ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PictureModal;
