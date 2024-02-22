import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import { Box, Flex } from "@chakra-ui/react";
import { bg } from "../styles/style";
import UsersList from "../components/UsersList";
import { Layout } from "../layout/Layout";

const Search = () => {
    return (
        <>
            <Layout search>
                <UsersList />
            </Layout>
        </>
    );
};

export default Search;
