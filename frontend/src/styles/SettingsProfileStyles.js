// SettingsProfileStyles.js
import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
  background-color: #2c3e50;
  color: white;
`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const ProfileHeader = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

export const ProfileCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

export const ProfileSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
`;

export const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #eee;
  margin-bottom: 1rem;
`;

export const UploadButton = styled.label`
  padding: 0.5rem 1rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357bd8;
  }
`;

export const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 1rem 1.5rem;
  align-items: center;
`;

export const ProfileDetailItem = styled.div`
  display: contents;
`;

export const ProfileLabel = styled.label`
  font-weight: bold;
  color: #555;
`;

export const ProfileInfo = styled.span`
  color: #333;
`;

export const ProfileForm = styled.form`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 1rem 1.5rem;
  align-items: center;
`;

export const FormInput = styled.input`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;

  &:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const ButtonGroup = styled.div`
  grid-column: 2;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const EditButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #357bd8;
  }
`;

export const SaveButton = styled(EditButton)`
  background-color: #4CAF50;

  &:hover {
    background-color: #3e8e41;
  }
`;

export const CancelButton = styled(EditButton)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;