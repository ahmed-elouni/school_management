import {UserSection,Title,Button, AdminUserContainer
 } from "../styles/AdminUserStyles";
 import {Link} from 'react-router-dom';
 const AdminUser=() => {
    return (
        <AdminUserContainer>
            <UserSection>
                <Title>
                    Bienvenue
                </Title>
                <Button to="/admin-signIn"> Se connecter comme un administrateur</Button>
                            
                
            </UserSection>
        </AdminUserContainer>
    )
 }
 export default AdminUser;