import React, { useState } from "react";
import * as Components from './Components';
import './authstyle.css';
import axios, { AxiosError }  from "axios";
import { apiUrl } from '../globals/globalEnv';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Authc(): JSX.Element {
    const [signIn, setSignIn] = useState<boolean>(true);
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    });
     const [errorMessage, setErrorMessage] = useState<string>("");
     const [successMessage, setSuccessMessage] = useState<string>("");
     const [isRegistered, setIsRegistered] = useState<boolean>(false);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

   const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
        if (apiUrl) {
             const url =  `${apiUrl}/users/signup`; 
            const response = await axios.post(url, formData);
            // Handle successful response
            toast.success("User Registration successful");
            toast.error("");
            setSuccessMessage("User registration successful");
            setErrorMessage("");
            setIsRegistered(true);

      // Set jwt auth token as a cookie
      document.cookie = `jwtToken=${response.data.token}; path=/; SameSite=None; Secure`;

    } else {
      console.error("apiUrl is not defined");
    }
  } catch (err: unknown) {
    // Handle error and display error message
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError;
      if (
        axiosError.response &&
        axiosError.response.data &&
        (axiosError.response.data as any).error // Explicitly specify type as any
      ) {
        setErrorMessage((axiosError.response.data as any).error);
        toast.error((axiosError.response.data as any).error);
      } else {
        setErrorMessage("An error occurred during signup.");
        toast.error("An error occurred during signup.");
      }
        }
        }
    };
    const handleSignInClick = () => {
    setSignIn(true);
    setIsRegistered(false); // Reset the registration status when switching to sign-in form
  };

  const handleSignUpClick = () => {
    setSignIn(false);
  };


    return (
    <div className="authc-container">
     {/* ... */}
      <ToastContainer />
        <Components.Container>
            <Components.SignUpContainer signIn={signIn}>
                <Components.Form onSubmit={handleSubmit}>
                    <Components.Title>Create Account</Components.Title>
                    <Components.Input type='text' name="username"  placeholder='User Name'   value={formData.username}
              onChange={handleInputChange} />
                    <Components.Input type='email' name="email"  placeholder='Email'   value={formData.email}
              onChange={handleInputChange} />
                    <Components.Input type='password'  name="password"  placeholder='Password'  value={formData.password}
              onChange={handleInputChange} />
                    <Components.Input type='password' name="password2"  placeholder='Confirm Password'  value={formData.password2}
              onChange={handleInputChange} />
                    <Components.Button type="submit">Sign Up</Components.Button>
                      {errorMessage && <span className="error-message">{errorMessage}</span>}
                      {successMessage && <span className="success-message">{successMessage}</span>}
                </Components.Form>
            </Components.SignUpContainer>

            <Components.SignInContainer signIn={signIn}>
                <Components.Form>
                    <Components.Title>Sign In</Components.Title>
                    <Components.Input type='email' placeholder='Email' />
                    <Components.Input type='password' placeholder='Password' />
                    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                    <Components.Button>Sign In</Components.Button>
                </Components.Form>
            </Components.SignInContainer>

            <Components.OverlayContainer signIn={signIn}>
                <Components.Overlay signIn={signIn}>

                    <Components.LeftOverlayPanel signIn={signIn}>
                        <Components.Title>Welcome Back!</Components.Title>
                        <Components.Paragraph>
                            To keep connected with us, please login with your personal info.
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => setSignIn(true)}>
                            Sign In
                        </Components.GhostButton>
                    </Components.LeftOverlayPanel>

                    <Components.RightOverlayPanel signIn={signIn}>
                        <Components.Title>Hello, Friend!</Components.Title>
                        <Components.Paragraph>
                            Enter your personal details and start your journey with us.
                        </Components.Paragraph>
                        <Components.GhostButton onClick={() => setSignIn(false)}>
                            Sign Up
                        </Components.GhostButton>
                    </Components.RightOverlayPanel>

                </Components.Overlay>
            </Components.OverlayContainer>

        </Components.Container>
        </div>
    );
}

export default Authc;
