import { Box, Card, Text } from "@chakra-ui/react";
import { bg, text } from "../styles/style";
import Suggestion from "./Suggestion";
import ProfileCard from "./ProfileCard";

const RightSidebar = () => {
    return (
        <Box p="5" w={"100%"} h={"100%"} borderLeft={"1px solid #fff"}>
            <ProfileCard />
            <Suggestion />
            <Card bg={bg.secondary} p="3">
                <Text color={text.primary} bg={bg.secondary}>
                    Developed By Fahmi
                </Text>
                <Text color={text.secondary} bg={bg.secondary} fontSize="14" display="flex" flexDirection="row">
                    Powered by
                    <img src="src/assets/dumbways.png" style={{ height: "14px", margin: "5px 5px 0px 5px" }} />
                    Dumbways.id #1 Coding Bootcamp
                </Text>
            </Card>
        </Box>
    );
};

export default RightSidebar;
