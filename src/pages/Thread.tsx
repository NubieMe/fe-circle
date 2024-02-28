import Detail from "../components/Detail";
import { useParams } from "react-router-dom";
import { Layout } from "../layout/Layout";

const Thread = () => {
    const params = useParams();
    const id = params.id!;

    return (
        <>
            <Layout>
                <Detail id={id} />
            </Layout>
        </>
    );
};

export default Thread;
