import UsersList from "../features/search/components/UsersList";
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
