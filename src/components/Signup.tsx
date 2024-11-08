import { useState } from "react"

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '', // required
        password: '', // required
        username: '' // optional
    })

    function handleSubmit(e:any) {
        e.preventDefault()
        fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    function handleChange(e:any) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    return (
        <div>
            <h1>Sign up</h1>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <p><input type='text' placeholder='Username' value={formData.username} name='username' onChange={e => handleChange(e)} ></input></p>
                <p><input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input></p>
                <p><input type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} ></input></p>
                <button className='login-btn' type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignupPage