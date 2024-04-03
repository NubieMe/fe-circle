import { Avatar, Box, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { bg } from "../../../styles/style";
import { FaImage } from "react-icons/fa6";
import { useThread } from "../../../hooks/useThread";
import { useAppSelector } from "../../../stores/hooks";

const InputPost = () => {
    const { handleChange, postThread, form } = useThread();
    const user = useAppSelector((state) => state.user);

    return (
        <form>
            <Flex mb="3">
                <Box>
                    <Link to={`/${user.username}`}>
                        <Avatar src={!user.picture ? "/src/assets/default.jpg" : user.picture} />
                    </Link>
                </Box>
                <Input
                    bg={bg.primary}
                    placeholder="What is happening?"
                    variant="ghost"
                    name="content"
                    color="white"
                    value={form.content}
                    mt="1"
                    onChange={(e) => handleChange(e)}
                />
                <FormLabel htmlFor="image" mt="3">
                    <FaImage size={25} />
                </FormLabel>
                <Input type="file" name="image" multiple={true} id="image" hidden onChange={(e) => handleChange(e)} />
                <Button
                    type="submit"
                    bg="green"
                    color="white"
                    mt="1"
                    borderRadius={20}
                    px={6}
                    _hover={{ bg: "green.500" }}
                    onClick={(e) => postThread(e)}>
                    Post
                </Button>
            </Flex>
        </form>
    );
};

export default InputPost;
