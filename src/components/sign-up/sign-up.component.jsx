import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

const SignUp = () => {
    const [stateAuth, setStateAuth] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = stateAuth;

        if (password !== confirmPassword) {
            alert ('Passwords do not match');
            return;
        } 
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            setStateAuth({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch(error) {
            console.error(error);
        }
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setStateAuth({ ...stateAuth, [name]: value });
     }

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sign up with your email and password</span>

            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput 
                    name='displayName' 
                    type='text' 
                    value={stateAuth.displayName}
                    handleChange={handleChange}
                    label='display name'
                    required 
                />
                <FormInput 
                    name='email' 
                    type='email' 
                    value={stateAuth.email}
                    handleChange={handleChange}
                    label='email'
                    required 
                />
                <FormInput 
                    name='password' 
                    type='password' 
                    value={stateAuth.password}
                    handleChange={handleChange}
                    label='password'
                    required 
                />
                 <FormInput 
                    name='confirmPassword' 
                    type='password' 
                    value={stateAuth.confirmPassword}
                    handleChange={handleChange}
                    label='confirm password'
                    required 
                />
                
                <CustomButton type='submit' value="Sumbit Form">Sign up</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;