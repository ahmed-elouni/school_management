import styled from 'styled-components';

export const AnnouncementContainer = styled.div`
   display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
  justify-content: center; /* Ajouté pour le centrage horizontal */

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
   flex: 1;
  padding: 2rem;
  max-width: 1200px; /* Largeur maximale pour le contenu */
  width: 100%; /* Prend toute la largeur disponible */
  margin: 0 auto; /* Centrage horizontal */
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    padding: 1rem;
    margin: 1rem; /* Marge réduite sur mobile */
  }
`;

export const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
  text-align: center; /* Centrage du titre */
`;

export const AnnouncementForm = styled.form`
    background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  max-width: 800px; /* Largeur maximale du formulaire */
  margin-left: auto; /* Centrage du formulaire */
  margin-right: auto;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #357bd8;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

export const AnnouncementList = styled.div`
 margin-top: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  max-width: 800px; /* Largeur maximale de la liste */
  margin-left: auto; /* Centrage de la liste */
  margin-right: auto;
`;

export const AnnouncementItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid #4a90e2;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const AnnouncementContent = styled.p`
  margin: 0.5rem 0;
  color: #555;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const AnnouncementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const AnnouncementDate = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const AnnouncementActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const FileInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f0f0f0;
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
  }
`;

export const FilePreview = styled.div`
  margin-top: 0.5rem;
  img {
    border: 1px solid #ddd;
    border-radius: 4px;
    max-width: 200px;
    max-height: 200px;
  }
`;

export const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 0.3rem;
  line-height: 1;

  &:hover {
    color: #c0392b;
  }
`;

export const AttachmentContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const AttachmentItem = styled.div`
  display: flex;
  align-items: center;
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
`;

export const AttachmentIcon = styled.span`
  margin-right: 0.5rem;
  color: #555;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
  background-color: #2c3e50;
  color: white;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;

  @media screen and (max-width: 768px) {
    position: relative;
    min-height: auto;
    width: 100%;
    flex: 0 0 auto;
  }
`;