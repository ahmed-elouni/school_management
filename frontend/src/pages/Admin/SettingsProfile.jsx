// SettingsProfile.js
import React, { useState } from 'react';
import Sidebar from './SIdebar';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileCard,
  ProfileDetails,
  ProfileDetailItem,
  ProfileLabel,
  ProfileInfo,
  EditButton,
  SaveButton,
  CancelButton,
  ProfileForm,
  FormInput,
  ButtonGroup,
  ProfileImageContainer,
  ProfileImage,
  UploadButton,
  ProfileSection,
  SectionTitle
} from '../../styles/SettingsProfileStyles';

const SettingsProfile = () => {
  const [adminInfo, setAdminInfo] = useState({
    name: 'Alaeddine',
    email: 'alaeddinehnayen@gmail.com',
    phone: '55555555',
    address: 'Sidi Alouane',
    profileImage: '/default-profile.jpg'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState({...adminInfo});

  const handleEdit = () => {
    setTempInfo({...adminInfo});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setAdminInfo({...tempInfo});
    setIsEditing(false);
    // Ici vous ajouteriez un appel API pour sauvegarder les modifications
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempInfo(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      
      <Content>
        <ProfileHeader>Paramètres du Profil</ProfileHeader>
        
        <ProfileCard>
          <ProfileSection>
            <SectionTitle>Photo de Profil</SectionTitle>
            <ProfileImageContainer>
              <ProfileImage src={isEditing ? tempInfo.profileImage : adminInfo.profileImage} alt="Profile" />
              {isEditing && (
                <>
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <UploadButton htmlFor="profile-upload">
                    Changer la photo
                  </UploadButton>
                </>
              )}
            </ProfileImageContainer>
          </ProfileSection>

          <ProfileSection>
            <SectionTitle>Informations Personnelles</SectionTitle>
            
            {isEditing ? (
              <ProfileForm onSubmit={handleSave}>
                <ProfileDetailItem>
                  <ProfileLabel htmlFor="name">Nom:</ProfileLabel>
                  <FormInput
                    type="text"
                    id="name"
                    name="name"
                    value={tempInfo.name}
                    onChange={handleChange}
                  />
                </ProfileDetailItem>

                <ProfileDetailItem>
                  <ProfileLabel htmlFor="email">Email:</ProfileLabel>
                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    value={tempInfo.email}
                    onChange={handleChange}
                  />
                </ProfileDetailItem>

                <ProfileDetailItem>
                  <ProfileLabel htmlFor="phone">Téléphone:</ProfileLabel>
                  <FormInput
                    type="tel"
                    id="phone"
                    name="phone"
                    value={tempInfo.phone}
                    onChange={handleChange}
                  />
                </ProfileDetailItem>

                <ProfileDetailItem>
                  <ProfileLabel htmlFor="address">Adresse:</ProfileLabel>
                  <FormInput
                    type="text"
                    id="address"
                    name="address"
                    value={tempInfo.address}
                    onChange={handleChange}
                  />
                </ProfileDetailItem>

                <ButtonGroup>
                  <SaveButton type="submit">Enregistrer</SaveButton>
                  <CancelButton type="button" onClick={handleCancel}>
                    Annuler
                  </CancelButton>
                </ButtonGroup>
              </ProfileForm>
            ) : (
              <>
                <ProfileDetails>
                  <ProfileDetailItem>
                    <ProfileLabel>Nom:</ProfileLabel>
                    <ProfileInfo>{adminInfo.name}</ProfileInfo>
                  </ProfileDetailItem>

                  <ProfileDetailItem>
                    <ProfileLabel>Email:</ProfileLabel>
                    <ProfileInfo>{adminInfo.email}</ProfileInfo>
                  </ProfileDetailItem>

                  <ProfileDetailItem>
                    <ProfileLabel>Téléphone:</ProfileLabel>
                    <ProfileInfo>{adminInfo.phone}</ProfileInfo>
                  </ProfileDetailItem>

                  <ProfileDetailItem>
                    <ProfileLabel>Adresse:</ProfileLabel>
                    <ProfileInfo>{adminInfo.address}</ProfileInfo>
                  </ProfileDetailItem>
                </ProfileDetails>
                <EditButton onClick={handleEdit}>Modifier le Profil</EditButton>
              </>
            )}
          </ProfileSection>
        </ProfileCard>
      </Content>
    </ProfileContainer>
  );
};

export default SettingsProfile;