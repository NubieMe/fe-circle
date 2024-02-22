import React from "react";
import { Layout } from "../layout/Layout";
import Main from "../components/Main";
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
