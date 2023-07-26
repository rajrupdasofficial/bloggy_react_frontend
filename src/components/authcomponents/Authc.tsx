import React, { useState } from "react";
import * as Components from './Components';
import './authstyle.css';
import axios from "axios";
import { apiUrl } from '../globals/globalEnv';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
 


const Authc: React.FC = () => {
  const [signIn, setSignIn] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const navigate = useNavigate(); // useNavigate hook

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
        const url = `${apiUrl}users/signup`;
        const response = await axios.post(url, formData);
        // Handle successful response
        console.log(response)
        toast.success("User Registration successful");
        setSuccessMessage("User registration successful");
        setIsRegistered(true);

        // Set jwt auth token as a cookie
        const cookies = new Cookies();
        cookies.set('_intercom_secure_token', response.data.intercom, { path: '/', sameSite: 'strict', secure: true});
        // now set the jwt token in localstorage so that it will not go lost after a reftesh
        localStorage.setItem('_intercom_secure_token',response.data.intercom);


        let nullcookie = new Cookies();
        let voidcookie = nullcookie.get('_intercom_secure_token');

        if(!voidcookie){
         let intercom = localStorage.getItem('_intercom_secure_token');

          if(intercom){
            const cookies = new Cookies();

            cookies.set('_intercom_secure_token', intercom,{path:'/', sameSite:'strict', secure:true});
          }

        }


      } else {
        console.error("apiUrl is not defined");
      }
    } catch (err) {
      // Handle error and display error message
      if (axios.isAxiosError(err)) {
        const axiosError = err;
        if (
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.error
        ) {
          setErrorMessage(axiosError.response.data.error);
          toast.error(axiosError.response.data.error);
        } else {
          setErrorMessage("An error occurred during signup.");
          toast.error("An error occurred during signup.");
        }
      }
    }
  };

  interface SignInFormData {
  email: string;
  password: string;
  }

  const handleSignInFormSubmit = async (signInFormData: SignInFormData, event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (apiUrl) {
        const url = `${apiUrl}users/login`;
        const response = await axios.post(url, signInFormData, {
    headers: {
      'Content-Type': 'application/json',
    },

        }

        );

        console.log(response)
        const  cookies = new Cookies();
        // Set jwt auth token as a cookie
       cookies.set('_intercom_secure_token', response.data.intercom, { path: '/', sameSite: 'strict', secure: true});
       cookies.set('_intercom_secure_csrf', response.data._intercom_csrf_token,{path:'/',sameSite:'strict',secure: true})
       cookies.set('_intercom_session_id',response.data._intercom_session_id,{path:'/', sameSite:'strict',secure: true})

        // Use the navigate function to navigate to the home page or another page
        navigate('/'); // Replace '/' with the desired URL
         localStorage.setItem('_intercom_secure_',response.data.token);

         const intercomCookie = cookies.get('_intercom_secure_token');

        if(!intercomCookie){
         const intercomatlocal = localStorage.getItem('_intercom_secure_token');

          if(intercomatlocal){
            cookies.set('_intercom_secure_token', intercomatlocal,{path:'/', sameSite:'none', secure:true});
          }

        }
      } else {
        console.error("apiUrl is not defined");
      }
    } catch (err) {
      // Handle error and display error message
      if (axios.isAxiosError(err)) {
        const axiosError = err;
        if (
          axiosError.response &&
          axiosError.response.data &&
          axiosError.response.data.error
        ) {
          toast.error(axiosError.response.data.error);
        } else {
          toast.error("An error occurred during sign-in.");
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
      <ToastContainer />
      <Components.Container>
        <Components.SignUpContainer signIn={signIn}>
          {isRegistered ? (
            <Components.Form>
              <Components.Title>Sign In</Components.Title>
              <Components.Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
              <Components.Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
              <Components.Anchor href="#">
                Forgot your password?
              </Components.Anchor>
              <Components.Button onClick={(event) => handleSignInFormSubmit(formData, event)}>Sign In</Components.Button>
            </Components.Form>
          ) : (
            <Components.Form onSubmit={handleSubmit}>
              <Components.Title>Create Account</Components.Title>
              <Components.Input
                type="text"
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleInputChange}
              />
              <Components.Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Components.Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <Components.Input
                type="password"
                name="password_confirm"
                placeholder="Confirm Password"
                value={formData.password_confirm}
                onChange={handleInputChange}
              />
              <Components.Button type="submit">Sign Up</Components.Button>
              {errorMessage && (
                <span className="error-message">{errorMessage}</span>
              )}
              {successMessage && (
                <span className="success-message">{successMessage}</span>
              )}
            </Components.Form>
          )}
        </Components.SignUpContainer>

        <Components.SignInContainer signIn={signIn}>
        <Components.Form>
              <Components.Title>Sign In</Components.Title>
              <Components.Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
              <Components.Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
              <Components.Anchor href="#">
                Forgot your password?
              </Components.Anchor>
              <Components.Button type="submit" onClick={(event) => handleSignInFormSubmit(formData, event)}>Sign In</Components.Button>
            </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signIn={signIn}>
          <Components.Overlay signIn={signIn}>
            <Components.LeftOverlayPanel signIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us, please login with your personal
                info.
              </Components.Paragraph>
              <Components.GhostButton onClick={handleSignInClick}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start your journey with us.
              </Components.Paragraph>
              <Components.GhostButton onClick={handleSignUpClick}>
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
