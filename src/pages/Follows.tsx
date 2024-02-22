import { Grid, GridItem } from "@chakra-ui/react";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import FollowList from "../components/FollowList";
import { Layout } from "../layout/Layout";

const Follows = () => {
    return (
        <>
            <Layout follows>
                <FollowList />
            </Layout>
        </>
    );
};

export default Follows;
