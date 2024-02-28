import { Layout } from "../layout/Layout";
import UserProfile from "../features/profile/components/UserProfile";

const Profile = () => {
    return (
        <>
            <Layout profile>
                <UserProfile />
            </Layout>
        </>
    );
};

export default Profile;
