import styled from 'styled-components';
import { Modal, Button, Select } from 'antd';

export const MainContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px; /* Ajustez selon la largeur de votre sidebar */
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;
`;

export const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 24px;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const StyledSelect = styled(Select)`
  min-width: 200px;
  border-radius: 4px;
`;

export const TimeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

export const TimeTableHeader = styled.thead`
  background-color: #3498db;
  color: white;
`;

export const TimeTableHeaderCell = styled.th`
  padding: 12px;
  text-align: center;
  border: 1px solid #e8e8e8;
  font-weight: 500;
`;

export const TimeTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

export const TimeTableCell = styled.td`
  padding: 12px;
  border: 1px solid #e8e8e8;
  text-align: center;
  cursor: pointer;
  height: 60px;
  position: relative;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e9f7fe;
  }

  &.has-course {
    background-color: #e3f2fd;
    font-weight: 500;
  }
`;

export const CourseInfo = styled.div`
  font-size: 12px;
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px;
  overflow: hidden;
  line-height: 1.3;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-header {
    background-color: #3498db;
    color: white;
  }
  
  .ant-modal-title {
    color: white;
  }

  .ant-modal-body {
    padding: 24px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
  }
`;

/* Nouveaux styles pour les boutons d'export */
export const ExportButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.3s;

  &.pdf-btn {
    background-color: #e74c3c;
    border-color: #e74c3c;
    &:hover {
      background-color: #c0392b;
      border-color: #c0392b;
    }
  }

  &.excel-btn {
    background-color: #2ecc71;
    border-color: #2ecc71;
    &:hover {
      background-color: #27ae60;
      border-color: #27ae60;
    }
  }

  &.validate-btn {
    background-color: #3498db;
    border-color: #3498db;
    &:hover {
      background-color: #2980b9;
      border-color: #2980b9;
    }
  }

  &.cancel-btn {
    background-color: #95a5a6;
    border-color: #95a5a6;
    &:hover {
      background-color: #7f8c8d;
      border-color: #7f8c8d;
    }
  }
`;

/* Style pour les messages */
export const MessageContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  background-color: ${props => props.type === 'error' ? '#fdecea' : '#e8f5e9'};
  color: ${props => props.type === 'error' ? '#f44336' : '#2e7d32'};
  display: flex;
  align-items: center;
  gap: 10px;
`;

/* Style responsive pour les petits écrans */
export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${FiltersContainer} {
      flex-direction: column;
    }

    ${StyledSelect} {
      width: 100%;
    }

    ${ActionButtons} {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;