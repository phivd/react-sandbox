import { useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import CircularProgress from "./CircularProgress"

const SignupPage: React.FC = () => {
    const [signedUp, setSignedup] = useState<string>('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    })

    async function handleSubmit(e:any) {
        e.preventDefault()
        const response = await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        const data = await response.json();
        if(data.user) {
            setSignedup('SIGNED');
        } else {
            setSignedup(data);
        }
    }

    function handleChange(e:any) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    let progress = useMotionValue(90);
    return (
        <div>
            <h1>Sign up</h1>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <p><input type='text' placeholder='Username' value={formData.username} name='username' onChange={e => handleChange(e)} ></input></p>
                <p><input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input></p>
                <p><input type='password' placeholder='Password' name='password' onChange={e => handleChange(e)} ></input></p>
                <button className='login-button' type='submit'>Sign Up</button>
                {signedUp === 'SIGNED' && (
                <div className='checkmark'>
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: 100 }}
                        style={{ x: progress }}
                        transition={{ duration: 0.5 }}
                    />
                    <CircularProgress progress={progress} mark='check' />
                </div>
                )}
                {signedUp !== 'SIGNED' && signedUp !== ''  && (
                <><div className='checkmark'>
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: 100 }}
                        style={{ x: progress }}
                        transition={{ duration: 0.5 }}
                    />
                    <CircularProgress progress={progress} mark='cross' />
                </div>
                <p className="account-body">{signedUp}</p></>
                )}
            </form>
        </div>
    )
}

export default SignupPage