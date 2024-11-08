import { useParams } from 'react-router-dom';
import useFetch from '../useFetch';
import Login from './Login';
import Signup from './Signup';
import "./UserPage.css"

const UserPage = () => {
    const { id } = useParams();
    const { data: user, error, isPending } = useFetch("http://localhost:8000/users/" + id);

    return (
        <>
            <section>
                {isPending && <p><center>Loading user details...</center></p>}

                {error && (
                    <>
                    <div className='account-body'>
                        <p><center>Log in or create an account.</center></p>
                        <center>
                        <div className='login'>
                            <Login/>
                        </div>
                        <div className="vseparator"></div>
                        <div className='signup'>
                            <Signup/>
                        </div>
                        </center>
                    </div>
                    </>
                )}

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