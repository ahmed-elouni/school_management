import styled from 'styled-components';

export const EventCalendarContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin: 1rem;
  margin-left: 260px;

  @media (max-width: 768px) {
    margin-left: 1rem;
    padding: 1rem;
  }
`;

export const CalendarContainer = styled.div`
  margin-top: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  overflow: hidden;

  .rbc-calendar {
    min-height: 600px;
  }

  .rbc-event {
    padding: 2px 5px;
    font-size: 0.85em;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    
    .rbc-calendar {
      min-height: 400px;
    }
  }
`;

export const Events = styled.div`
  margin-top: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;

  h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
`;

export const Event = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 4px solid ${props => props.important ? '#ff6b6b' : '#3174ad'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }

  p {
    margin: 0.5rem 0;
    color: #555;
  }
`;

export const AddEventForm = styled.form`
  margin-top: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: -0.5rem;
  }
`;

export const EventInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const EventDateInput = styled(EventInput)`
  width: auto;
  max-width: 250px;
`;

export const EventDescriptionInput = styled.textarea`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

export const EventTypeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    background-color: white;
  }
`;

export const AddEventButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  align-self: flex-start;

  &:hover {
    background-color: #357bd8;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  color: #e74c3c;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

export const EventActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.danger ? '#e74c3c' : '#3498db'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.danger ? '#c0392b' : '#2980b9'};
  }
`;

export const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const EventDetails = styled.div`
  p {
    margin: 0.3rem 0;
    line-height: 1.5;

    strong {
      color: #2c3e50;
      font-weight: 600;
    }
  }

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
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

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;

  h2 {
    margin: 0;
    color: #2c3e50;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #7f8c8d;
  padding: 0 0.5rem;

  &:hover {
    color: #e74c3c;
  }
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Tag = styled.span`
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background-color: ${props => props.color || '#3498db'};
  color: white;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;