import styled from 'styled-components';
import { Table, Tabs, Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import { Tooltip, Divider } from 'antd';
export const TeachersContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 250px;
`;
export const AbsenceBadge = styled(Badge)`
  .ant-badge-count {
    background-color: ${props => {
      if (props.justified === 'true') return '#52c41a'; // Vert pour justifié
      if (props.justified === 'false') return '#f5222d'; // Rouge pour non justifié
      return '#d9d9d9'; // Gris par défaut
    }};
    box-shadow: 0 0 0 1px #fff;
  }
`;

export const AbsenceTag = styled(Tag)`
  margin-right: 0;
  color: white;
  background-color: ${props => 
    props.justified === 'true' ? '#52c41a' : 
    props.justified === 'false' ? '#f5222d' : 
    '#d9d9d9'};
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
`;

export const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 20px;
  }
  
  .ant-tabs-tab {
    font-weight: 500;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: #3498db;
    color: white;
  }
`;

export const StyledModal = styled(Modal)`
  .ant-modal-header {
    background-color: #3498db;
  }
  
  .ant-modal-title {
    color: white;
  }
`;

export const FormItem = styled(Form.Item)`
  margin-bottom: 16px;
`;

export const StatusTag = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  
  &.permanent {
    background-color: #d4edda;
    color: #155724;
  }
  
  &.vacataire {
    background-color: #fff3cd;
    color: #856404;
  }
  
  &.absent {
    background-color: #f8d7da;
    color: #721c24;
  }
`;