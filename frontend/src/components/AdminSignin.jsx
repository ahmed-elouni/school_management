import { useState } from "react";
import { AdminSignInContainer, FormContainer, InputField,SubmitButton } from "../styles/AdminSignInStyles";
import axios from 'axios';

const AdminSignin =() => {
    const[ nom ,setNom]=useState('');
    const [ prenom,setPrenom]= useState('');
    const [ email,setEmail]= useState('');
    const [ password,setPassword]=useState ('');
    const handleSignIn = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:4000/api/v1/signin', { nom, prenom, email, password }); 
          if (response.status === 200) {
            // Sign-in successful, redirect to admin dashboard
            window.location.href = '/admin/dashboard';
          } else {
            // Handle sign-in errors
            console.error('Sign-in failed');
          }
        } catch (error) {
          console.error('Error during sign-in:', error);
        }
      };
    
    return ( 
        <AdminSignInContainer>
            <h2> Connexion  </h2>

            <FormContainer>
            <InputField
                type ='nom'
                placeholder='Nom'
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
                />
                <InputField
                type ='prenom'
                placeholder='Prénom'
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
                />
                <InputField
                type ='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                  <InputField
                type ='password'
                placeholder='Mot de passe'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <SubmitButton to='/admin/dashboard' onClick={handleSignIn}>Se connecter</SubmitButton>
                
                
                
            </FormContainer>
             </AdminSignInContainer>
    )
}
export default AdminSignin;