// ClassesStyles.js
import styled from 'styled-components';

export const ClassesContainer = styled.div`
  display: flex;
  padding-left: 240px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
  }
`;

export const Content = styled.div`
  flex: 1;
`;

export const ClassesContent = styled.div`
  padding: 20px;
`;

export const ClassesHeader = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ClassList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ClassItem = styled.li`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const AddClassForm = styled.form`
  margin-bottom: 20px;
`;

export const AddClassInput = styled.input`
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const AddClassButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;


export const ClassContainer = styled.div`
  display: flex;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px; /* Sidebar width */
`;

export const ClassHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const GradeHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;
export const ClassInfo = styled.div`
  flex: 1;
  font-size: 1.1rem;
`;

export const ClassActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SecondaryButton = styled.button`
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

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  font-style: italic;
`;
export const AddClassSelect = styled.select`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  flex: 1;
`;
export const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
export const ClassTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  text-align: left;
`;

export const TableRow = styled.tr`
  background-color: #fff;
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;
