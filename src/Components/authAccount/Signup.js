import React, { useState } from 'react';
import "./Signup.css"
const Signup = () => {
    const [person, setPerson] = useState({ userName:"", password:""})
    
    const handleChange = (e) => {
        const name = e.target.value;
        const value = e.target.value
        setPerson({...person, [name] : value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (person.userName && person.password) {
            setPerson({ userName: "", password: "" })
        }

    }
    return (
        <div className="signup">
            <form onclick={ handleSubmit} action="">
           <div className='form-control'>
            <label htmlFor='firstName'>userName : </label>
            <input
              type='text'
              id='userName'
              name='userName'
              value={person.userName}
              onChange={handleChange}
                    />
            </div>
         </form>
        </div>
    )
}

export default Signup
