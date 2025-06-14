import React, { useState, useEffect } from "react";
import SIdebar from "./SIdebar";
import EventCalendar from "./EventCalendar";
import Performance from "./Performance";
import axios from "axios";
import {
  AdminDashboardContainer,
  Content,
  BottomContent,
  Section,
  SectionTitle,
  CardContainer,
  Card,
  CardContent,
  CardTitle,
  TopContent,
} from '../../styles/DashboardStyles';
import Annonce from "./Announcment";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [studentPerformance, setStudentPerformance] = useState(null);

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
    fetchStudentPerformance();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/events/getall');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Erreur lors du chargement des évènements', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Erreur lors du chargement des annonces:', error);
    }
  };

  const fetchStudentPerformance = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/performance/school');
      setStudentPerformance(response.data || null);
    } catch (error) {
      console.error('Erreur lors du chargement des performances:', error);
    }
  };

  return (
    <AdminDashboardContainer>
      <SIdebar />
      <Content>
        <TopContent>
          <Section>
            <SectionTitle>Aperçu</SectionTitle>
            <CardContainer>
              <Card>
                <CardTitle>Nombre total d’élèves</CardTitle>
                <CardContent>500</CardContent>
              </Card>
              <Card>
                <CardTitle>Nombre total d’enseignants</CardTitle>
                <CardContent>20</CardContent>
              </Card>
              <Card>
                <CardTitle>Nombre total de classes</CardTitle>
                <CardContent>20</CardContent>
              </Card>
            </CardContainer>
          </Section>

          <Section>
            <SectionTitle>Tous les événements</SectionTitle>
            <EventCalendar events={events} />
          </Section>
        </TopContent>

        <BottomContent>
          {studentPerformance && (
            <Performance studentPerformance={studentPerformance} />
          )}
          <Annonce announcements={announcements || []} />
        </BottomContent>
      </Content>
    </AdminDashboardContainer>
  );
};

export default AdminDashboard;
