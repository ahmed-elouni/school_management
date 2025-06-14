import React, { useState, useEffect } from "react";
import Sidebar from './SIdebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AnnouncementContainer,
  Content,
  Title,
  AnnouncementForm,
  FormGroup,
  Label,
  TextArea,
  Button,
  SecondaryButton,
  AnnouncementList,
  AnnouncementItem,
  AnnouncementContent,
  AnnouncementHeader,
  AnnouncementDate,
  AnnouncementActions,
  FileInputContainer,
  FilePreview,
  RemoveFileButton,
  AttachmentContainer,
  AttachmentItem,
  AttachmentIcon
} from '../../styles/AnnouncementStyles';
import { FaPaperclip, FaImage, FaFilePdf, FaTrash, FaEdit } from 'react-icons/fa';

const Annonce = () => {
  const [announcement, setAnnouncement] = useState({
    content: '',
    files: []
  });
  const [announcements, setAnnouncements] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnnouncementId, setCurrentAnnouncementId] = useState(null);

  // Function to fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      console.log('Réponse API:', response.data); // Debug
      setAnnouncements(response.data.announcements || response.data || []);
    } catch (error) {
      console.error('Erreur:', error.response?.data || error.message);
      toast.error('Échec du chargement');
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFile(files[0]);
    
    // Create previews for images
    const previews = files.map(file => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return null;
    });
    setFilePreviews(previews.filter(preview => preview !== null));
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
    setFilePreviews([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('content', announcement.content);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      if (isEditing && currentAnnouncementId) {
        // Update existing announcement
        await axios.put(`http://localhost:4000/api/v1/announcements/${currentAnnouncementId}`, formData, {

        });
        toast.success('Mise à jour Annonce');
      } else {
        // Create new announcement
        await axios.post('http://localhost:4000/api/v1/announcements', formData, {
         
        });
        toast.success('Annonce envoyée');
      }

      // Reset form and fetch updated announcements
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      console.error('Error envoi annonce:', error);
      toast.error(error.response?.data?.message || 'Error  envoi annonce');
    }
  };

  // Edit announcement
  const handleEdit = (announcement) => {
    setAnnouncement({
      content: announcement.content,
      files: announcement.files || []
    });
    setCurrentAnnouncementId(announcement._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete announcement
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/announcements/${id}`);
      toast.success('Annonce supprimée');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error suppresion annonce:', error);
      toast.error('Error suppresion annonce');
    }
  };

  // Reset form
  const resetForm = () => {
    setAnnouncement({
      content: '',
      files: []
    });
    setSelectedFile(null);
    setFilePreviews([]);
    setIsEditing(false);
    setCurrentAnnouncementId(null);
  };

  // Get file icon based on file type
  const getFileIcon = (fileUrl) => {
    const extension = fileUrl.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FaImage />;
      case 'pdf':
        return <FaFilePdf />;
      default:
        return <FaPaperclip />;
    }
  };

  return (
    <AnnouncementContainer>
      <ToastContainer position="top-right" autoClose={3000} />
      <Sidebar />
      <Content>
        <Title>{isEditing ? 'Editer Annonce' : 'Créer Annonce'}</Title>
        
        <AnnouncementForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="announcement">Le contenu de l'annonce:</Label>
            <TextArea
              id="announcement"
              value={announcement.content}
              onChange={(e) => setAnnouncement({...announcement, content: e.target.value})}
              required
              rows={6}
              placeholder="Ecrivez votre annonce içi..."
            />
          </FormGroup>

          <FormGroup>
            <Label>Piéce jointe:</Label>
            <FileInputContainer>
              <label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <Button as="div">
                  <FaPaperclip /> Ajouter la pièce jointe
                </Button>
              </label>
              {selectedFile && (
                <div>
                  <span>{selectedFile.name}</span>
                  <RemoveFileButton onClick={removeFile}>
                    <FaTrash />
                  </RemoveFileButton>
                </div>
              )}
            </FileInputContainer>

            {filePreviews.map((preview, index) => (
              <FilePreview key={index}>
                <img src={preview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </FilePreview>
            ))}
          </FormGroup>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button type="submit">
              {isEditing ? 'Mise à jour Annonce' : 'Envoyer Annonce'}
            </Button>
            {isEditing && (
              <SecondaryButton type="button" onClick={resetForm}>
                Annuler
              </SecondaryButton>
            )}
          </div>
        </AnnouncementForm>

        <h2>les annonces récentes</h2>
        <AnnouncementList>
          {announcements.map((item) => (
            <AnnouncementItem key={item._id}>
              <AnnouncementHeader>
                <AnnouncementDate>
                  {new Date(item.createdAt).toLocaleString()}
                </AnnouncementDate>
                <AnnouncementActions>
                  <Button onClick={() => handleEdit(item)}>
                    <FaEdit /> Editer
                  </Button>
                  <SecondaryButton onClick={() => handleDelete(item._id)}>
                    <FaTrash /> Supprimer
                  </SecondaryButton>
                </AnnouncementActions>
              </AnnouncementHeader>
              
              <AnnouncementContent>{item.content}</AnnouncementContent>
              
              {item.files && item.files.length > 0 && (
      <AttachmentContainer>
        <Label>Pièces jointes:</Label>
        {item.files
          .filter(file => file) // Filtre les valeurs null/undefined
          .map((file, index) => {
            // Extrait le nom du fichier
            const filename = typeof file === 'string' 
              ? file.split('/').pop() 
              : file.filename;
            
            // Construit l'URL complète
            const fileUrl = file.startsWith('http') 
              ? file 
              : `http://localhost:4000/uploads/announcements/${filename}`;

            return (
              <AttachmentItem key={index}>
                <AttachmentIcon>
                  {getFileIcon(filename)}
                </AttachmentIcon>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                  {filename}
                </a>
                    </AttachmentItem>
                    );
          })
        }
                </AttachmentContainer>
              )}
            </AnnouncementItem>
          ))}
        </AnnouncementList>
      </Content>
    </AnnouncementContainer>
  );
};

export default Annonce;