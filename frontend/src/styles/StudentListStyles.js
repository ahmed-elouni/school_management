import styled from 'styled-components';
export const StudentListContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
`;
export const Content = styled.div`
  padding: 20px;
  margin-left: 250px; // Si vous avez une sidebar
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const StudentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;
export const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
`;
export const StudentTableHeader = styled.th`
  background-color: #f8f9fa;
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
`;

export const StudentTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  &:hover {
    background-color: #e9ecef;
  }
`;

export const StudentTableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #dee2e6;
`;

export const StudentTablePhotoCell = styled(StudentTableCell)`
  width: 60px;
`;

export const StudentPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
  
  .search-box {
    display: flex;
    align-items: center;
    flex-grow: 1;
    max-width: 400px;
    position: relative;
  }
  
  .search-icon {
    position: absolute;
    left: 10px;
    color: #6c757d;
  }
  
  .filter-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .filter-icon {
    color: #6c757d;
  }
`;

export const SearchInput = styled.input`
  padding: 8px 15px 8px 35px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const FilterSelect = styled.select`
  padding: 8px 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  margin: 0 5px;
  font-size: 16px;
  
  &:hover {
    color: #0056b3;
  }
`;
export const StudentCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 15px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

`;
export const StudentInfo = styled.div`
  padding: 15px;
  
  h3 {
    margin: 0 0 5px 0;
    font-size: 1.1rem;
    color: #2c3e50;
  }
  
  p {
    margin: 3px 0;
    font-size: 0.9rem;
    color: #7f8c8d;
  }
`;
export const StudentsContainer = styled.div`
   display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;
export const StudentsContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 60px);
`;
export const StudentsHeader = styled.div`
   width: 100%;
  max-width: 900px;
  margin-bottom: 30px;
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  
  button {
    padding: 5px 15px;
    border: 1px solid #dee2e6;
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &:hover:not(:disabled) {
      background-color: #e9ecef;
    }
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  margin-left: auto;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  overflow: hidden;

  button {
    padding: 5px 15px;
    border: none;
    background: white;
    cursor: pointer;

    &.active {
      background: #3498db;
      color: white;
    }

    &:first-child {
      border-right: 1px solid #bdc3c7;
    }
  }
`;

export const StudentsTable = styled.div`
  margin-top: 20px;
  border: 1px solid #ecf0f1;
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background: #3498db;
  color: white;
  padding: 12px 15px;
  font-weight: bold;

  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    span {
      font-size: 12px;
    }
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 12px 15px;
  border-bottom: 1px solid #ecf0f1;
  background: white;

  &:nth-child(even) {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;