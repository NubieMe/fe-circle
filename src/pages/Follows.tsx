import FollowList from "../features/follow/components/FollowList";
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
