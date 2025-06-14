// AttendanceStyles.js
import styled from 'styled-components';

export const AttendanceContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

export const Content = styled.div`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

export const AttendanceContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const AttendanceHeader = styled.h1`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

export const AttendanceCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const DateSelector = styled.input`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

export const ClassSelector = styled.select`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 200px;
`;

export const SearchInput = styled.input`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
  min-width: 200px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

export const AttendanceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AttendanceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 6px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StudentName = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
`;

export const StatusOptions = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const StatusButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ active, color }) => active ? color : '#f0f0f0'};
  color: ${({ active }) => active ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s;
  display: block;
  margin-left: auto;

  &:hover {
    background-color: #357bd8;
  }
`;