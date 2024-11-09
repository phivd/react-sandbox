import { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import "./UserPage.css"

const UserPage = () => {
    sessionStorage.setItem('activePage', "UserPage");

    const [userId, setUserId] = useState<any>(sessionStorage.getItem('userId'));
    const [isPending, setIsPending] = useState<boolean>(true);
    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState<any | null>(null);

    function UserFetch(id:any) {
        const userToken = sessionStorage.getItem('userToken');
        if (!userToken) {
            setError('Error fetching users data: must be authenticated');
            setIsPending(false);
        } else {
            setTimeout(() => {
                fetch("http://localhost:8000/users/" + id)
                .then(res => {
                    if (!res.ok) {
                        throw Error('Error fetching users data');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    setIsPending(false);
                    setError(err.message);
                });
            }, 1000);
        }
    }

    useEffect(() => {UserFetch(userId)});

    function handleSubmit() {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userToken');
    }

    return (
        <><section>
            {isPending && <p><center>Loading user details...</center></p>}
            <div className='account-body'>
            {error && (
                <><p><center>Log in or create an account.</center></p>
                <center>
                <div className='login'>
                    <Login setUserId={setUserId}/>
                </div>
                <div className="vseparator"></div>
                <div className='signup'>
                    <Signup/>
                </div>
                </center></>
            )}
            {!error && data && (
                <><div className='account-body'><center>
                    <div className='account-details'>
                    <h1>User details</h1>
                    <table style={{minWidth:'30vh'}}>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>Username:</td><td>{data.username}</td>
                        </tr>
                        <tr>
                            <td>Email:</td><td>{data.email}</td>
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