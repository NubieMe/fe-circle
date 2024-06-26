import { Box, Flex } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { bg } from "../styles/style";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <Box>
            <Flex w={"100%"} h={"auto"} bg={bg.primary}>
                <Box h={"auto"} w={{ base: "4rem", lg: "20%", xl: "25%" }} pos={"relative"}>
                    <Box
                        pos={"fixed"}
                        zIndex={10}
                        top={0}
                        bottom={0}
                        left={0}
                        w={{ base: "4rem", lg: "18%", xl: "19.98%" }}>
                        <LeftSidebar />
                    </Box>
                </Box>

                <Flex w={"100%"} h={"auto"}>
                    <Box w={{ base: "100%", md: "100%", lg: "100%", xl: "65%" }}>
                        <Outlet />
                    </Box>
                    <Box w={{ base: "0px", md: "0px", lg: "40%", xl: "35%" }} overflow={"hidden"}>
                        <RightSidebar />
                    </Box>
                </Flex>
            </Flex>
        </Box>
    );
};
