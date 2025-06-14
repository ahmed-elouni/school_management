import { useState } from "react";
import { AdminRegisterContainer, FormContainer, InputField,SubmitButton } from "../styles/AdminRegisterStyles";
import axios from 'axios'; // Import axios

const AdminRegister =() => {
    const[ nom ,setNom]=useState('');
    const [ prenom,setPrenom]= useState('');
    const [ email,setEmail]= useState('');
    const [ password,setPassword]=useState ('');
    const handleRegister = async (e) => {
        e.preventDefault(); 
        if (password.length < 6) {
            alert("Le mot de passe doit contenir au moins 6 caractères !");
            return; // Arrête l'exécution si le mot de passe est trop court
          }
        try {
          const response = await axios.post('http://localhost:4000/api/v1/admin', {nom, prenom, email, password }); 
          if (response.status === 201) {
            // Registration successful, redirect to admin login
            window.location.href = '/admin-signIn';
          } else {
            // Handle registration errors
            console.error('Registration failed');
          }
         } catch (error) {
            console.error('Erreur:', error.response?.data || error.message);
            alert(error.response?.data?.message || "Erreur lors de l'inscription");
          }
      };
       
    return ( 
        <AdminRegisterContainer>
            <h2> Enregistrer administrateur </h2>

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
                placeholder='Prenom'
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
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <SubmitButton type='button' onClick={(e) => handleRegister(e)}>Enregistrer</SubmitButton>
                
                
                
            </FormContainer>
             </AdminRegisterContainer>
    )
}
export default AdminRegister;