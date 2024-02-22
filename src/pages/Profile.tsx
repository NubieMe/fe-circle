import { Layout } from "../layout/Layout";
import UserProfile from "../components/UserProfile";

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
