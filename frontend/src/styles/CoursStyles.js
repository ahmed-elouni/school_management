import styled from 'styled-components';

export const MatieresContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px; /* Ajustez selon la largeur de votre sidebar */
`;

export const MatieresContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const MatieresHeader = styled.h1`
  color: #1890ff;
  margin-bottom: 24px;
  font-size: 24px;
`;

export const SectionTitle = styled.h2`
  color: #1890ff;
  margin: 24px 0 16px;
  font-size: 18px;
`;

export const FormContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`;

export const StyledInput = styled(Input)`
  width: 250px;
  border-radius: 4px;
`;

export const StyledSelect = styled(Select)`
  min-width: 200px;
  border-radius: 4px;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
`;

export const CheckboxGroupContainer = styled.div`
  margin: 16px 0;
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
`;

export const CheckboxGroupTitle = styled.h4`
  margin-bottom: 12px;
  color: #333;
`;

export const StyledTable = styled(Table)`
  margin-top: 24px;
  
  .ant-table {
    border-radius: 8px;
    overflow: hidden;
  }
  
  .ant-table-thead > tr > th {
    background-color: #1890ff;
    color: white;
  }
`;