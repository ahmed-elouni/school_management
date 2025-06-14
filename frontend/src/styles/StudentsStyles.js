// src/styles/StudentsStyles.js
/*import styled from "styled-components";

export const StudentsContainer = styled.div`
   display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const StudentsContent = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 60px);
`;
export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;

  button {
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
`;
export const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;

  input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 300px;
  }

  button {
    padding: 8px 16px;
    background-color: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;
export const StudentsHeader = styled.div`
   width: 100%;
  max-width: 900px;
  margin-bottom: 30px;
`;
export const PageTitle = styled.h2`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
`;

export const StepTitle = styled.h3`
 font-size: 22px;
  color: #34495e;
  margin-bottom: 25px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ecf0f1;
`;

export const AddStudentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 15px;
`;
export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 250px;
`;


export const AddStudentInput = styled.input`
   padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  transition: border 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
`;

export const AddStudentSelect = styled.select`
 padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  background-color: white;
`;

export const AddStudentTextarea = styled.textarea`
   padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 15px;
  min-height: 100px;
  resize: vertical;
`;

export const AddStudentLabel = styled.label`
  font-size: 20px;
    display: flex;
    margin: 5px 0;
  font-weight: 500;
  margin-bottom: 8px;
  color: #7f8c8d;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
`;
export const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
    margin: 0;

`;

export const CheckboxLabel = styled.label`
  font-size: 16px;
  color: #34495e;
`;
export const NavigationButton = styled.button`
  padding: 12px 25px;
  background-color: ${props => props.primary ? '#3498db' : '#ecf0f1'};
  color: ${props => props.primary ? 'white' : '#7f8c8d'};
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#dfe6e9'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
export const AddStudentButton = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  font-weight: bold;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ButtonGroup = styled.div`
   display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const StudentList = styled.ul`
   width: 100%;
  max-width: 900px;
  margin-top: 40px;
`;

export const StudentItem = styled.li`
 background-color: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormStep = styled.div`
  width: 100%;
`;

export const StepNavigation = styled.div`
 display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 10px
`;
export const StepIndicator = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#3498db' : '#ecf0f1'};
  color: ${props => props.active ? 'white' : '#7f8c8d'};
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${props => props.active ? '#2980b9' : '#dfe6e9'};
  }
`;
export const StepButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#007bff' : '#f0f0f0'};
  color: ${props => props.active ? '#fff' : '#333'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#0069d9' : '#e0e0e0'};
  }
`;

export const FormSection = styled.div`
  background: #f8fafc;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 25px;
  border: 1px solid #ecf0f1;
`;

export const FormSectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  color: #2c3e50;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 20px;
    background-color: #3498db;
    margin-right: 10px;
    border-radius: 4px;
  }
`;
export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

export const FileInputLabel = styled.label`
  padding: 12px 15px;
  background-color: #f8f9fa;
  border: 1px dashed #ddd;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #e9ecef;
    border-color: #3498db;
  }
`;
export const FileInput = styled.input`
  display: none;
`;
const StudentTypeSelector = styled.div`
  margin-bottom: 25px;
  width: 100%;
  max-width: 400px;
`;
export const PhotoPreview = styled.img`
  width: 12px;
  height: 15px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 40px;
  margin-bottom: 15px;
  display: block;
`;
export const ExportButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;
*/
// src/styles/StudentsStyles.js
import styled from "styled-components";

// Reusable color palette
const colors = {
  primary: "#1e90ff",
  primaryDark: "#1c7ed6",
  secondary: "#f1f3f5",
  danger: "#e74c3c",
  dangerDark: "#c0392b",
  light: "#ffffff",
  gray: "#7f8c8d",
  border: "#dfe6e9",
  shadow: "rgba(0, 0, 0, 0.1)",
};

export const StudentsContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(145deg, #f0f2f5, #ffffff);
`;

export const StudentsContent = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const StudentsHeader = styled.div`
  width: 100%;
  max-width: 960px;
  margin-bottom: 40px;
`;

export const PageTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
`;

export const StepTitle = styled.h3`
  font-size: 24px;
  color: #2c3e50;
  border-bottom: 2px solid ${colors.border};
  padding-bottom: 8px;
  margin-bottom: 25px;
`;

export const SearchBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;

  input {
    padding: 10px 14px;
    border-radius: 6px;
    border: 1px solid ${colors.border};
    width: 300px;
    font-size: 15px;
  }

  button {
    padding: 10px 20px;
    background: ${colors.primary};
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: ${colors.primaryDark};
    }
  }
`;

export const AddStudentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  background: white;
  padding: 35px;
  border-radius: 16px;
  box-shadow: 0 8px 24px ${colors.shadow};
  width: 100%;
  max-width: 960px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 260px;
`;

export const AddStudentLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: ${colors.gray};
`;

export const AddStudentInput = styled.input`
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid ${colors.border};
  font-size: 15px;
  transition: 0.3s;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(30, 144, 255, 0.1);
  }
`;

export const AddStudentSelect = styled.select`
  ${AddStudentInput}
  background-color: white;
`;

export const AddStudentTextarea = styled.textarea`
  ${AddStudentInput}
  min-height: 120px;
  resize: vertical;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 15px;

  button {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    background: ${colors.primary};
    color: white;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.3s;

    &:hover {
      background: ${colors.primaryDark};
    }
  }
`;

export const NavigationButton = styled.button`
  padding: 12px 25px;
  background-color: ${props => props.primary ? colors.primary : colors.secondary};
  color: ${props => props.primary ? "#fff" : colors.gray};
  font-weight: 600;
  border: none;
  border-radius: 8px;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.primary ? colors.primaryDark : "#dee2e6"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AddStudentButton = styled(NavigationButton)`
  align-self: flex-end;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const StudentList = styled.ul`
  width: 100%;
  max-width: 960px;
  margin-top: 40px;
`;

export const StudentItem = styled.li`
  background: white;
  border-radius: 12px;
  padding: 20px 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px ${colors.shadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FormStep = styled.div`
  width: 100%;
`;

export const StepNavigation = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 10px;
`;

export const StepIndicator = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: ${props => props.active ? colors.primary : colors.secondary};
  color: ${props => props.active ? "white" : colors.gray};
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: ${props => props.active ? colors.primaryDark : "#dcdde1"};
  }
`;

export const StepButton = styled(StepIndicator)`
  border-radius: 8px;
`;

export const FormSection = styled.div`
  background: #f8fafc;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 25px;
  border: 1px solid ${colors.border};
`;

export const FormSectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  color: #2c3e50;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    width: 8px;
    height: 20px;
    background: ${colors.primary};
    border-radius: 4px;
    margin-right: 10px;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
`;

export const CheckboxLabel = styled.label`
  font-size: 16px;
  color: ${colors.gray};
`;

export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const FileInputLabel = styled.label`
  padding: 16px;
  background-color: #f8f9fa;
  border: 2px dashed ${colors.border};
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #e9ecef;
    border-color: ${colors.primary};
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const PhotoPreview = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border: 2px solid ${colors.border};
  border-radius: 50%;
  margin-top: 10px;
`;

export const ExportButton = styled.button`
  background: ${colors.danger};
  color: white;
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${colors.dangerDark};
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;
