import { useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import CircularProgress from "./CircularProgress"

const LoginPage: React.FC = () => {    
    const [loggedIn, setLoggedIn] = useState<string>('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    async function handleSubmit(e:any) {
        e.preventDefault()
        const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        const data = await response.json();
        if(data.user) {
            setLoggedIn('');
            sessionStorage.setItem('id', data.user.id);
            window.location.reload();
        } else {
            setLoggedIn(data);
        }
    }

    function handleChange(e:any) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    let progress = useMotionValue(90);
    return (
        <div>
            <h1>Log in</h1>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <p><input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input></p>
                <p><input type='password' placeholder='Password' name='password' onChange={e => handleChange(e)} ></input></p>
                <button className='login-button' type='submit'>Login</button>
                {loggedIn != 'LOGGED' && loggedIn != '' && (
                <><div className='checkmark'>
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: 100 }}
                        style={{ x: progress }}
                        transition={{ duration: 0.5 }}
                    />
                    <CircularProgress progress={progress} mark='cross' />
                </div>
                <p className="account-body">{loggedIn}</p></>
                )}
            </form>
        </div>
    )
}

export default LoginPage