// PerformanceStyles.js
import styled from 'styled-components';

export const PerformanceContainer = styled.div`
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

export const PerformanceContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const PerformanceHeader = styled.h1`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
`;

export const PerformanceCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;

  h2 {
    color: #2c3e50;
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
  }
`;

export const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

export const MetricCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
`;

export const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

export const MetricLabel = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

export const StudentTable = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  font-weight: bold;
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  align-items: center;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const TableCell = styled.div`
  padding: 0.5rem;
`;

export const SubjectChart = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 1rem;
`;

export const TermSelector = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  min-width: 120px;
`;

// Ajoutez d'autres styles personnalisés si nécessaire
export const ClassSelector = styled.select`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 200px;
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

export const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  font-style: italic;
`;

export const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const SearchInput = styled.input`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
  min-width: 200px;
`;