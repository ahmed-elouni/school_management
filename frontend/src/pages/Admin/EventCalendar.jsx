import React, { useState, useEffect } from 'react';
import Sidebar from './SIdebar';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  EventCalendarContainer,
  Content,
  CalendarContainer,
  Events,
  Event,
  AddEventForm,
  EventInput,
  EventDateInput,
  EventDescriptionInput,
  AddEventButton,
  ErrorText,
  EventActions,
  ActionButton,
  EventHeader,
  EventDetails,
  FileInputContainer,
  FilePreview,
  RemoveFileButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  CloseButton,
  EventTypeSelector,
  TagContainer,
  Tag
} from '../../styles/EventCalendarStyles';

// Setup calendar localizer
const localizer = momentLocalizer(moment);
moment.locale('fr');

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    files: [],
    type: 'general',
    important: false
  });
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Event types with colors
  const eventTypes = [
    { value: 'general', label: 'Général', color: '#3174ad' },
    { value: 'meeting', label: 'Réunion', color: '#4CAF50' },
    { value: 'exam', label: 'Examen', color: '#FF9800' },
    { value: 'holiday', label: 'Vacances', color: '#9C27B0' }
  ];

  // Function to fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events/getall');
      const formattedEvents = response.data.events.map(event => ({
        ...event,
        start: new Date(event.date),
        end: new Date(event.date),
        title: event.title,
        allDay: false
      }));
      setEvents(response.data.events || []);
      setCalendarEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Erreur lors du chargement des événements');
    }
  };

  useEffect(() => {
    fetchEvents();
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

  // Function to add a new event
  const addEvent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newEvent.title);
      formData.append('date', newEvent.date);
      formData.append('description', newEvent.description);
      formData.append('type', newEvent.type);
      formData.append('important', newEvent.important);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await axios.post('http://localhost:4000/api/v1/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const formattedEvent = {
        ...response.data.event,
        start: new Date(response.data.event.date),
        end: new Date(response.data.event.date),
        title: response.data.event.title,
        allDay: false
      };

      setEvents([...events, response.data.event]);
      setCalendarEvents([...calendarEvents, formattedEvent]);
      resetForm();
      setError(null);
      toast.success('Événement ajouté avec succès');
    } catch (error) {
      console.error('Error adding event:', error);
      handleError(error, "Erreur lors de l'ajout de l'événement");
      toast.error("Erreur lors de l'ajout de l'événement");
    }
  };

  // Function to update an event
  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', currentEvent.title);
      formData.append('date', currentEvent.date);
      formData.append('description', currentEvent.description);
      formData.append('type', currentEvent.type);
      formData.append('important', currentEvent.important);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await axios.put(
        `http://localhost:4000/api/v1/events/${currentEvent._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const updatedEvents = events.map(event => 
        event._id === currentEvent._id ? response.data.event : event
      );

      const updatedCalendarEvents = calendarEvents.map(event => 
        event._id === currentEvent._id 
          ? { 
              ...response.data.event, 
              start: new Date(response.data.event.date),
              end: new Date(response.data.event.date)
            } 
          : event
      );

      setEvents(updatedEvents);
      setCalendarEvents(updatedCalendarEvents);
      closeModal();
      resetForm();
      setError(null);
      toast.success('Événement mis à jour avec succès');
    } catch (error) {
      console.error('Error updating event:', error);
      handleError(error, "Erreur lors de la mise à jour de l'événement");
      toast.error("Erreur lors de la mise à jour de l'événement");
    }
  };

  // Function to delete an event
  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/events/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
      setCalendarEvents(calendarEvents.filter(event => event._id !== eventId));
      toast.success('Événement supprimé avec succès');
    } catch (error) {
      console.error('Error deleting event:', error);
      handleError(error, "Erreur lors de la suppression de l'événement");
      toast.error("Erreur lors de la suppression de l'événement");
    }
  };

  // Open modal for editing
  const openEditModal = (event) => {
    setCurrentEvent(event);
    setNewEvent({
      title: event.title,
      date: moment(event.date).format('YYYY-MM-DDTHH:mm'),
      description: event.description,
      type: event.type,
      important: event.important
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setNewEvent({
      title: '',
      date: '',
      description: '',
      files: [],
      type: 'general',
      important: false
    });
    setSelectedFile(null);
    setFilePreviews([]);
  };

  // Handle error
  const handleError = (error, defaultMessage) => {
    if (error.response && error.response.data && error.response.data.error) {
      setError(error.response.data.error);
    } else {
      setError(defaultMessage);
    }
  };

  // Filter events by search term
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calendar event style
  const eventStyleGetter = (event) => {
    const eventType = eventTypes.find(type => type.value === event.type);
    const backgroundColor = event.important ? '#ff6b6b' : (eventType ? eventType.color : '#3174ad');
    
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <EventCalendarContainer>
      <Sidebar />
      <Content>
        <h1>Gestion des Événements</h1>
        <div>Date actuelle: {moment().format('LLL')}</div>
        
        <CalendarContainer>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={(event) => openEditModal(event)}
            messages={{
              today: "Aujourd'hui",
              previous: 'Précédent',
              next: 'Suivant',
              month: 'Mois',
              week: 'Semaine',
              day: 'Jour',
              agenda: 'Agenda',
              date: 'Date',
              time: 'Heure',
              event: 'Événement',
              noEventsInRange: 'Aucun événement dans cette période.'
            }}
          />
        </CalendarContainer>

        <AddEventForm onSubmit={addEvent}>
          <h2>Ajouter un nouvel événement</h2>
          
          <EventInput
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            placeholder="Titre de l'événement"
            required
          />
          
          <EventDateInput
            type="datetime-local"
            value={newEvent.date}
            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            required
          />
          
          <EventDescriptionInput
            value={newEvent.description}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            placeholder="Description de l'événement"
            rows={4}
          />
          
          <EventTypeSelector>
            <label>Type d'événement:</label>
            <select
              value={newEvent.type}
              onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
            >
              {eventTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </EventTypeSelector>
          
          <label>
            <input
              type="checkbox"
              checked={newEvent.important}
              onChange={(e) => setNewEvent({...newEvent, important: e.target.checked})}
            />
            Événement important
          </label>
          
          <FileInputContainer>
            <label>
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <ActionButton as="div">Ajouter une pièce jointe</ActionButton>
            </label>
            {selectedFile && (
              <div>
                <span>{selectedFile.name}</span>
                <RemoveFileButton onClick={removeFile}>×</RemoveFileButton>
              </div>
            )}
          </FileInputContainer>
          
          {filePreviews.map((preview, index) => (
            <FilePreview key={index}>
              <img src={preview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            </FilePreview>
          ))}
          
          <AddEventButton type="submit">Ajouter l'événement</AddEventButton>
        </AddEventForm>
        
        {error && <ErrorText>{error}</ErrorText>}
        
        <Events>
          <h2>Liste des événements</h2>
          
          <EventInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher des événements..."
            style={{ marginBottom: '20px', width: '100%' }}
          />
          
          {filteredEvents.map((event) => {
            const eventType = eventTypes.find(type => type.value === event.type);
            
            return (
              <Event key={event._id}>
                <EventHeader>
                  <div>
                    <h3>{event.title}</h3>
                    {eventType && <Tag color={eventType.color}>{eventType.label}</Tag>}
                    {event.important && <Tag color="#ff6b6b">Important</Tag>}
                  </div>
                  <EventActions>
                    <ActionButton onClick={() => openEditModal(event)}>
                      Modifier
                    </ActionButton>
                    <ActionButton danger onClick={() => deleteEvent(event._id)}>
                      Supprimer
                    </ActionButton>
                  </EventActions>
                </EventHeader>
                <EventDetails>
                  <p><strong>Date:</strong> {moment(event.date).format('LLL')}</p>
                  <p><strong>Description:</strong> {event.description}</p>
                  {event.fileUrl && (
                    <div>
                      <strong>Pièce jointe:</strong>
                      <a 
                        href={`http://localhost:4000/${event.fileUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ marginLeft: '10px' }}
                      >
                        {event.fileUrl.split('/').pop()}
                      </a>
                    </div>
                  )}
                </EventDetails>
              </Event>
            );
          })}
        </Events>
      </Content>

      {/* Edit Event Modal */}
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2>Modifier l'événement</h2>
              <CloseButton onClick={closeModal}>×</CloseButton>
            </ModalHeader>
            
            <AddEventForm onSubmit={updateEvent}>
              <EventInput
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                placeholder="Titre de l'événement"
                required
              />
              
              <EventDateInput
                type="datetime-local"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                required
              />
              
              <EventDescriptionInput
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                placeholder="Description de l'événement"
                rows={4}
              />
              
              <EventTypeSelector>
                <label>Type d'événement:</label>
                <select
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </EventTypeSelector>
              
              <label>
                <input
                  type="checkbox"
                  checked={newEvent.important}
                  onChange={(e) => setNewEvent({...newEvent, important: e.target.checked})}
                />
                Événement important
              </label>
              
              <FileInputContainer>
                <label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <ActionButton as="div">Changer la pièce jointe</ActionButton>
                </label>
                {selectedFile && (
                  <div>
                    <span>{selectedFile.name}</span>
                    <RemoveFileButton onClick={removeFile}>×</RemoveFileButton>
                  </div>
                )}
              </FileInputContainer>
              
              {filePreviews.map((preview, index) => (
                <FilePreview key={index}>
                  <img src={preview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                </FilePreview>
              ))}
              
              {currentEvent?.fileUrl && !selectedFile && (
                <div>
                  <strong>Pièce jointe actuelle:</strong>
                  <a 
                    href={`http://localhost:4000/${currentEvent.fileUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ marginLeft: '10px' }}
                  >
                    {currentEvent.fileUrl.split('/').pop()}
                  </a>
                </div>
              )}
              
              <AddEventButton type="submit">Enregistrer les modifications</AddEventButton>
            </AddEventForm>
          </ModalContent>
        </ModalOverlay>
      )}
    </EventCalendarContainer>
  );
};

export default EventCalendar;