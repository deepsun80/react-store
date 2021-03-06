import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

const SignIn = () => {
    const [stateAuth, setStateAuth] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async event => {
        event.preventDefault();

        const { email, password } = stateAuth;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setStateAuth({
                email: '',
                password: ''
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
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
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
                <div className='buttons'>
                    <CustomButton type='submit' value="Sumbit Form">Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignIn;
