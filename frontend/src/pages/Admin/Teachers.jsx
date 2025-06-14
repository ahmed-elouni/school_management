import React, { useState, useEffect } from "react";
import Sidebar from "./SIdebar";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  FileExcelOutlined,
  SearchOutlined,
  ClockCircleOutlined,
  PieChartOutlined,
  DollarOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { 
  Tabs, 
  Table, 
  Button, 
  Input, 
  Modal, 
  Form, 
  Select, 
  DatePicker, 
  Tag,
  Badge,
  Popconfirm,
  Statistic,
  Row,
  Col,
  Tooltip,
  Divider
} from 'antd';
import * as XLSX from 'xlsx';
import styled from 'styled-components';

// Styles personnalisés
const TeachersContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 24px;
  background-color: #f0f2f5;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: #333;
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 16px;
  }
`;

const ActionButtons = styled.div`
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
`;

const StyledTable = styled(Table)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatusTag = styled(Tag)`
  &.permanent {
    background-color: #1890ff;
    color: white;
  }
  &.vacataire {
    background-color: #722ed1;
    color: white;
  }
`;

const AbsenceBadge = styled(Badge)`
  .ant-badge-count {
    background-color: ${props => {
      if (props.justified === 'true') return '#52c41a';
      if (props.justified === 'false') return '#f5222d';
      return '#d9d9d9';
    }};
    box-shadow: 0 0 0 1px #fff;
  }
`;

const AbsenceTag = styled(Tag)`
  margin-right: 0;
  color: white;
  background-color: ${props => 
    props.justified === 'true' ? '#52c41a' : 
    props.justified === 'false' ? '#f5222d' : 
    '#d9d9d9'};
`;

const { TabPane } = Tabs;

const Teachers = () => {
  // États
  const [permanentTeachers, setPermanentTeachers] = useState([]);
  const [vacataireTeachers, setVacataireTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('permanents');
  
  // États pour les modals
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAbsenceModalVisible, setIsAbsenceModalVisible] = useState(false);
  const [isHoursModalVisible, setIsHoursModalVisible] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  
  // Formulaires
  const [form] = Form.useForm();
  const [absenceForm] = Form.useForm();
  const [hoursForm] = Form.useForm();

  // Configuration API
  const api = axios.create({
    baseURL: 'http://localhost:4000/api/v1/teachers',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Fonctions API
  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const [permanents, vacataires] = await Promise.all([
        api.get('/', { params: { type: 'permanent' } }),
        api.get('/', { params: { type: 'vacataire' } })
      ]);
      setPermanentTeachers(permanents.data.teachers);
      setVacataireTeachers(vacataires.data.teachers);
    } catch (error) {
      toast.error('Erreur lors du chargement des enseignants');
      console.error('Error fetching teachers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createTeacher = async (teacherData) => {
    try {
      const response = await api.post('/', teacherData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la création';
    }
  };

  const updateTeacher = async (id, teacherData) => {
    try {
      const response = await api.put(`/${id}`, teacherData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la mise à jour';
    }
  };

  const deleteTeacher = async (id) => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la suppression';
    }
  };

  const addAbsence = async (teacherId, absenceData) => {
    try {
      const response = await api.post(`/${teacherId}/absences`, absenceData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de l\'ajout d\'absence';
    }
  };

  const updateHours = async (teacherId, hoursData) => {
    try {
      const response = await api.put(`/${teacherId}/hours`, hoursData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Erreur lors de la mise à jour des heures';
    }
  };

  // Chargement initial
  useEffect(() => {
    fetchTeachers();
  }, []);

  // Composant Tooltip pour les absences
  const AbsenceTooltip = ({ absences }) => (
    <div style={{ minWidth: 200 }}>
      <h4 style={{ marginBottom: 8 }}>Détail des absences:</h4>
      {absences.map((absence, index) => (
        <div key={index} style={{ marginBottom: 4 }}>
          <AbsenceTag justified={absence.justifiee.toString()}>
            {new Date(absence.date).toLocaleDateString()}
          </AbsenceTag>
          <span style={{ marginLeft: 8 }}>{absence.raison}</span>
        </div>
      ))}
    </div>
  );

  // Colonnes du tableau
  const teacherColumns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'CIN',
      dataIndex: 'cin',
      key: 'cin',
    },
    {
      title: 'Type',
      key: 'type',
      render: (_, record) => (
        <StatusTag className={record.type}>
          {record.type === 'permanent' ? 'Permanent' : 'Vacataire'}
        </StatusTag>
      ),
    },
    {
      title: 'Diplôme',
      dataIndex: 'diplome',
      key: 'diplome',
    },
    {
      title: 'Spécialité',
      dataIndex: 'specialite',
      key: 'specialite',
    },
    {
      title: 'Absences',
      key: 'absences',
      render: (_, record) => {
        const justifiedCount = record.absences.filter(a => a.justifiee).length;
        const unjustifiedCount = record.absences.filter(a => !a.justifiee).length;
        
        return (
          <Tooltip 
            title={<AbsenceTooltip absences={record.absences} />} 
            placement="right"
          >
            <div style={{ display: 'flex', gap: 8 }}>
              {justifiedCount > 0 && (
                <AbsenceBadge 
                  count={justifiedCount} 
                  justified="true"
                />
              )}
              {unjustifiedCount > 0 && (
                <AbsenceBadge 
                  count={unjustifiedCount} 
                  justified="false"
                />
              )}
              {record.absences.length === 0 && (
                <Tag color="#d9d9d9">Aucune absence</Tag>
              )}
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)} 
          />
          <Button 
            icon={<ClockCircleOutlined />} 
            onClick={() => handleAddAbsence(record)}
            style={{ color: record.absences.some(a => !a.justifiee) ? '#f5222d' : '#52c41a' }}
          />
          {record.type === 'vacataire' && (
            <Button 
              icon={<DollarOutlined />} 
              onClick={() => handleOpenHoursModal(record)} 
            />
          )}
          <Popconfirm
            title="Êtes-vous sûr de vouloir supprimer ce professeur?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Gestion des actions
  const handleAddTeacher = () => {
    form.resetFields();
    form.setFieldsValue({ type: activeTab === 'permanents' ? 'permanent' : 'vacataire' });
    setIsModalVisible(true);
  };

  const handleEdit = (teacher) => {
    form.setFieldsValue(teacher);
    setSelectedTeacher(teacher);
    setIsModalVisible(true);
  };

  const handleAddAbsence = (teacher) => {
    absenceForm.resetFields();
    setSelectedTeacher(teacher);
    setIsAbsenceModalVisible(true);
  };

  const handleOpenHoursModal = (teacher) => {
    hoursForm.setFieldsValue({
      heuresMois: teacher.heuresMois,
      tarifHoraire: teacher.tarifHoraire
    });
    setSelectedTeacher(teacher);
    setIsHoursModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTeacher(id);
      toast.success('Professeur supprimé avec succès');
      fetchTeachers();
    } catch (error) {
      toast.error(error);
    }
  };

  // Soumission des formulaires
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      if (values._id) {
        await updateTeacher(values._id, values);
        toast.success('Professeur mis à jour avec succès');
      } else {
        await createTeacher(values);
        toast.success('Professeur créé avec succès');
      }
      
      setIsModalVisible(false);
      fetchTeachers();
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Une erreur est survenue');
    }
  };

  const handleAbsenceSubmit = async () => {
    try {
      const values = await absenceForm.validateFields();
      await addAbsence(selectedTeacher._id, {
        date: values.date.format('YYYY-MM-DD'),
        raison: values.raison,
        justifiee: values.justifiee
      });
      
      toast.success('Absence enregistrée avec succès');
      setIsAbsenceModalVisible(false);
      fetchTeachers();
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Erreur lors de l\'enregistrement');
    }
  };

  const handleHoursSubmit = async () => {
    try {
      const values = await hoursForm.validateFields();
      await updateHours(selectedTeacher._id, values);
      
      toast.success('Heures mises à jour avec succès');
      setIsHoursModalVisible(false);
      fetchTeachers();
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Erreur lors de la mise à jour');
    }
  };

  // Export Excel
  const exportToExcel = () => {
    const teachers = activeTab === 'permanents' ? permanentTeachers : vacataireTeachers;
    
    const data = teachers.map(teacher => ({
      'Nom': teacher.name,
      'CIN': teacher.cin,
      'Type': teacher.type === 'permanent' ? 'Permanent' : 'Vacataire',
      'Diplôme': teacher.diplome,
      'Spécialité': teacher.specialite,
      'Absences justifiées': teacher.absences.filter(a => a.justifiee).length,
      'Absences non justifiées': teacher.absences.filter(a => !a.justifiee).length,
      'Dernière absence': teacher.absences.length > 0 
        ? teacher.absences[teacher.absences.length - 1].date 
        : 'Aucune'
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Professeurs");
    XLSX.writeFile(workbook, `professeurs_${activeTab}.xlsx`);
    toast.success('Export Excel réussi');
  };

  // Statistiques
  const showStats = () => {
    const teachers = activeTab === 'permanents' ? permanentTeachers : vacataireTeachers;
    const allAbsences = teachers.flatMap(t => t.absences);
    const totalAbsences = allAbsences.length;
    const justifiedAbsences = allAbsences.filter(a => a.justifiee).length;
    const unjustifiedAbsences = totalAbsences - justifiedAbsences;
    
    Modal.info({
      title: 'Statistiques des absences',
      icon: <InfoCircleOutlined />,
      content: (
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic 
                title="Nombre de professeurs" 
                value={teachers.length} 
              />
            </Col>
            <Col span={12}>
              <Statistic 
                title="Total des absences" 
                value={totalAbsences} 
              />
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={12}>
              <Statistic 
                title="Absences justifiées" 
                value={justifiedAbsences} 
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col span={12}>
              <Statistic 
                title="Absences non justifiées" 
                value={unjustifiedAbsences} 
                valueStyle={{ color: '#f5222d' }}
              />
            </Col>
          </Row>
          <Divider />
          <Row gutter={16}>
            <Col span={24}>
              <Statistic 
                title="Taux d'absences justifiées" 
                value={totalAbsences > 0 ? `${Math.round((justifiedAbsences/totalAbsences)*100)}%` : '0%'} 
              />
            </Col>
          </Row>
        </div>
      ),
      width: 600,
      okText: 'Fermer'
    });
  };

  // Filtrage des données
  const filteredPermanents = permanentTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchText.toLowerCase()) ||
    teacher.cin.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredVacataires = vacataireTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchText.toLowerCase()) ||
    teacher.cin.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <TeachersContainer>
      <Sidebar />
      <ContentContainer>
        <Header>
          <Title>Gestion des Professeurs</Title>
          <div style={{ display: 'flex', gap: 10 }}>
            <Input 
              placeholder="Rechercher..." 
              prefix={<SearchOutlined />} 
              style={{ width: 200 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={handleAddTeacher}
            >
              Ajouter
            </Button>
            <Button 
              icon={<FileExcelOutlined />} 
              onClick={exportToExcel}
            >
              Exporter Excel
            </Button>
          </div>
        </Header>

        <StyledTabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Permanents" key="permanents">
            <ActionButtons>
              <Button 
                icon={<PieChartOutlined />} 
                onClick={showStats}
              >
                Statistiques
              </Button>
            </ActionButtons>
            <StyledTable
              columns={teacherColumns}
              dataSource={filteredPermanents}
              rowKey="_id"
              loading={isLoading}
              scroll={{ x: true }}
            />
          </TabPane>
          <TabPane tab="Vacataires" key="vacataires">
            <ActionButtons>
              <Button 
                icon={<PieChartOutlined />} 
                onClick={showStats}
              >
                Statistiques
              </Button>
            </ActionButtons>
            <StyledTable
              columns={teacherColumns}
              dataSource={filteredVacataires}
              rowKey="_id"
              loading={isLoading}
              scroll={{ x: true }}
            />
          </TabPane>
        </StyledTabs>

        {/* Modal pour ajouter/modifier un professeur */}
        <Modal
          title={`${form.getFieldValue('_id') ? 'Modifier' : 'Ajouter'} un professeur`}
          visible={isModalVisible}
          onOk={handleSubmit}
          onCancel={() => setIsModalVisible(false)}
          okText="Enregistrer"
          cancelText="Annuler"
          width={700}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="_id" hidden>
              <Input />
            </Form.Item>
            
            <div style={{ display: 'flex', gap: 16 }}>
              <Form.Item
                name="name"
                label="Nom complet"
                rules={[{ required: true, message: 'Ce champ est obligatoire' }]}
                style={{ flex: 1 }}
              >
                <Input />
              </Form.Item>
              
              <Form.Item
                name="cin"
                label="CIN"
                rules={[{ required: true, message: 'Ce champ est obligatoire' }]}
                style={{ flex: 1 }}
              >
                <Input />
              </Form.Item>
            </div>
            
            <div style={{ display: 'flex', gap: 16 }}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true }]}
                style={{ flex: 1 }}
              >
                <Select>
                  <Select.Option value="permanent">Permanent</Select.Option>
                  <Select.Option value="vacataire">Vacataire</Select.Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="diplome"
                label="Diplôme"
                rules={[{ required: true }]}
                style={{ flex: 1 }}
              >
                <Select>
                  <Select.Option value="Doctorat">Doctorat</Select.Option>
                  <Select.Option value="Master">Master</Select.Option>
                  <Select.Option value="Licence">Licence</Select.Option>
                </Select>
              </Form.Item>
            </div>
            
            <div style={{ display: 'flex', gap: 16 }}>
              <Form.Item
                name="specialite"
                label="Spécialité"
                rules={[{ required: true }]}
                style={{ flex: 1 }}
              >
                <Input />
              </Form.Item>
              
              {form.getFieldValue('type') === 'permanent' ? (
                <Form.Item
                  name="anciennete"
                  label="Ancienneté"
                  style={{ flex: 1 }}
                >
                  <Input />
                </Form.Item>
              ) : (
                  <>
                <Form.Item
                  name="tarifHoraire"
                  label="Tarif horaire (DT)"
                  rules={[
    { 
      required: form.getFieldValue('type') === 'vacataire', 
      message: 'Ce champ est obligatoire pour les vacataires' 
    }
  ]}
                  style={{ flex: 1 }}
                >
                  <Input type="number" />
                </Form.Item>
                 <Form.Item
          name="heuresMois"
          label="Heures/mois"
          rules={[{ 
            required: form.getFieldValue('type') === 'vacataire', 
      message: 'Ce champ est obligatoire pour les vacataires'
          }]}
          style={{ flex: 1 }}
        >
                          <Input type="number" />

      
        </Form.Item>
      </>
              )}
            </div>
            
            {form.getFieldValue('type') === 'permanent' && (
              <Form.Item
                name="contrat"
                label="Type de contrat"
              >
                <Select>
                  <Select.Option value="CDI">CDI</Select.Option>
                  <Select.Option value="CDD">CDD</Select.Option>
                </Select>
              </Form.Item>
            )}
          </Form>
        </Modal>

        {/* Modal pour ajouter une absence */}
        <Modal
          title="Enregistrer une absence"
          visible={isAbsenceModalVisible}
          onOk={handleAbsenceSubmit}
          onCancel={() => setIsAbsenceModalVisible(false)}
          okText="Enregistrer"
          cancelText="Annuler"
        >
          <Form form={absenceForm} layout="vertical">
            <Form.Item
              name="date"
              label="Date"
              rules={[{ required: true, message: 'La date est obligatoire' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            
            <Form.Item
              name="raison"
              label="Raison"
              rules={[{ required: true, message: 'La raison est obligatoire' }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            
            <Form.Item
              name="justifiee"
              label="Statut"
              initialValue={true}
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value={true}>
                  <span style={{ color: '#52c41a' }}>Justifiée</span>
                </Select.Option>
                <Select.Option value={false}>
                  <span style={{ color: '#f5222d' }}>Non justifiée</span>
                </Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal pour les heures travaillées */}
        <Modal
          title={`Heures travaillées - ${selectedTeacher?.name}`}
          visible={isHoursModalVisible}
          onOk={handleHoursSubmit}
          onCancel={() => setIsHoursModalVisible(false)}
          okText="Enregistrer"
          cancelText="Annuler"
        >
          <Form form={hoursForm} layout="vertical">
            <Form.Item
              name="heuresMois"
              label="Heures ce mois"
              rules={[{ required: true, message: 'Ce champ est obligatoire' }]}
            >
              <Input type="number" />
            </Form.Item>
            
            <Form.Item
              name="tarifHoraire"
              label="Tarif horaire (DT)"
              rules={[{ required: true, message: 'Ce champ est obligatoire' }]}
            >
              <Input type="number" />
            </Form.Item>
            
            <div style={{ marginTop: 16 }}>
              <strong>Salaire estimé: </strong>
              {hoursForm.getFieldValue('heuresMois') && hoursForm.getFieldValue('tarifHoraire') ? (
                <span>{hoursForm.getFieldValue('heuresMois') * hoursForm.getFieldValue('tarifHoraire')} DT</span>
              ) : (
                <span>0 DT</span>
              )}
            </div>
          </Form>
        </Modal>
      </ContentContainer>
    </TeachersContainer>
  );
};

export default Teachers;