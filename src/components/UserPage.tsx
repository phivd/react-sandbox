import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';

const UserPage = () => {
    const { id } = useParams();
    const { data: user, error, isPending } = useFetch("http://localhost:8000/users/" + id);

    return (
        <>
            <section>
                {isPending && <p>Loading user details...</p>}

                {error && <p>{error}</p>}

                {user && (
                    <>
                        <h1>User {user.id} details</h1>
                        <h2>{user.username}</h2>
                        <p>{user.email}</p>
                    </>
                )}
            </section>
        </>
    );
};

export default UserPage;