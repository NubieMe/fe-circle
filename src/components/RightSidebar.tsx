import { Box, Card, Image, Text } from "@chakra-ui/react";
import { bg, text } from "../styles/style";
import Suggestion from "./Suggestion";
import ProfileCard from "./ProfileCard";

const RightSidebar = () => {
    return (
        <Box p="5" w={"100%"} h={"100%"} borderLeft={"1px solid #fff"} minH={"100vh"}>
            <ProfileCard />
            <Suggestion />
            <Card bg={bg.secondary} p="3" borderRadius={20}>
                <Text color={text.primary} bg={bg.secondary} fontSize="15">
                    Developed By Fahmi
                </Text>
                <Text color={text.secondary} bg={bg.secondary} fontSize="12" display="flex" flexDirection="row">
                    Powered by
                    <Image
                        src="https://res.cloudinary.com/dydmnzkfh/image/upload/v1713885983/jeug4lzigy42tvcvb2nl.png"
                        style={{ height: "12px", margin: "5px 5px 0px 5px" }}
                    />
                    Dumbways.id #1 Coding Bootcamp
                </Text>
            </Card>
        </Box>
    );
};

export default RightSidebar;
