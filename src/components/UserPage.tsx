import useFetch from '../useFetch';
import Login from './Login';
import Signup from './Signup';
import "./UserPage.css"

const UserPage = () => {
    sessionStorage.setItem('activePage', "UserPage");

    const id = sessionStorage.getItem('id');
    const { data: user, error, isPending } = useFetch("http://localhost:8000/users/" + id);

    function handleSubmit() {
        sessionStorage.removeItem('id');
    }

    return (
        <><section>
            {isPending && <p><center>Loading user details...</center></p>}
            <div className='account-body'>
            {error && (
                <><p><center>Log in or create an account.</center></p>
                <center>
                <div className='login'>
                    <Login/>
                </div>
                <div className="vseparator"></div>
                <div className='signup'>
                    <Signup/>
                </div>
                </center></>
            )}

            {user && (
                <><div className='account-body'><center>
                    <div className='account-details'>
                    <h1>User details</h1>
                    <table style={{minWidth:'30vh'}}>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>Username:</td><td>{user.username}</td>
                        </tr>
                        <tr>
                            <td>Email:</td><td>{user.email}</td>
                        </tr>
                    </table>
                    <p><form className='login-form' onSubmit={() => handleSubmit()}>
                        <button className='login-button' type='submit'>Log out</button>
                    </form></p>
                    </div>
                </center></div></>
            )}
            </div>
        </section></>
    );
};

export default UserPage;