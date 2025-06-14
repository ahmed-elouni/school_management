import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  BsGraphUp,
  BsPeople,
  BsPerson,
  BsFileText,
  BsBook,
  BsGraphDown,
  BsCalendar,
  BsGear,
  BsChatDots,
  BsCalendarEvent,
  BsChevronDown,
  BsChevronRight
} from 'react-icons/bs';

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ $isOpen }) => ($isOpen ? '250px' : '80px')};
  height: 100%;
  background-color: #2c3e50;
  color: white;
  overflow-y: auto;
  padding-top: 60px;
  transition: width 0.3s ease;
  z-index: 100;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 18px;
  border-bottom: 1px solid #34495e;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
  }
`;

const SubMenu = styled.ul`
  list-style: none;
  padding-left: 30px;
  background-color: #1a252f;
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const SubMenuItem = styled.li`
  padding: 10px 15px;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #34495e;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SidebarIcon = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const MenuText = styled.span`
  margin-left: 10px;
  display: ${({ $isOpen }) => ($isOpen ? 'inline' : 'none')};
`;

const ArrowIcon = styled.span`
  margin-left: auto;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
`;

const Logo = styled.img`
  width: 50px;
  height: auto;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: #34495e;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleIcon = styled.span`
  color: white;
  font-size: 20px;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [studentsMenuOpen, setStudentsMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleStudentsMenu = () => {
    setStudentsMenuOpen(!studentsMenuOpen);
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarHeader>
        <Logo src='../assets/bg1.png' alt='logo' />
      </SidebarHeader>
      <SidebarNav>
        <SidebarNavItem>
          <SidebarIcon> <BsGraphUp /> </SidebarIcon>
          <StyledLink to='/admin/dashboard'> Tableau de bord</StyledLink>
        </SidebarNavItem>

        <SidebarNavItem>
          <SidebarIcon> <BsPeople /> </SidebarIcon>
          <StyledLink to='/admin/classes'> Classes</StyledLink>
        </SidebarNavItem>

        <SidebarNavItem onClick={toggleStudentsMenu}>
          <SidebarIcon><BsPeople /></SidebarIcon>
          <MenuText $isOpen={isOpen}>Élèves</MenuText>
          <ArrowIcon $isOpen={studentsMenuOpen}>
            {studentsMenuOpen ? <BsChevronDown /> : <BsChevronRight />}
          </ArrowIcon>
        </SidebarNavItem>

        <SubMenu $isOpen={studentsMenuOpen && isOpen}>
          <SubMenuItem>
            <StyledLink to='/admin/students'>
              <SidebarIcon><BsPerson /></SidebarIcon>
              <MenuText $isOpen={isOpen}>Inscription</MenuText>
            </StyledLink>
          </SubMenuItem>
          <SubMenuItem>
            <StyledLink to="/admin/studentlist">
              <SidebarIcon><BsPeople /></SidebarIcon>
              <MenuText $isOpen={isOpen}>Liste des élèves</MenuText>
            </StyledLink>
          </SubMenuItem>
        </SubMenu>

        <SidebarNavItem>
          <SidebarIcon> <BsPerson /> </SidebarIcon>
          <StyledLink to='/admin/teachers'> Enseignants</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon> <BsBook /> </SidebarIcon>
          <StyledLink to='/admin/matieresdisciplines'> Matiéres</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon> <BsFileText /> </SidebarIcon>
          <StyledLink to="/admin/emploidutemps">Emploi du temps</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon> <BsBook /> </SidebarIcon>
          <StyledLink to="/admin/exams">Evaluation</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon> <BsGraphDown /> </SidebarIcon>
          <StyledLink to="/admin/performance"> Performance</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon> <BsCalendar /> </SidebarIcon>
          <StyledLink to="/admin/attendance"> Présence</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon> <BsChatDots /> </SidebarIcon>
          <StyledLink to="/admin/communication"> Annonces</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon> <BsCalendarEvent /> </SidebarIcon>
          <StyledLink to="/admin/events">Événements et calendrier</StyledLink>
        </SidebarNavItem>
        <SidebarNavItem>
          <SidebarIcon> <BsGear /> </SidebarIcon>
          <StyledLink to="/admin/settingsprofile">Paramètres de profil</StyledLink>
        </SidebarNavItem>

        <ToggleButton onClick={toggleSidebar}>
          <ToggleIcon $isOpen={isOpen}>▲</ToggleIcon>
        </ToggleButton>
      </SidebarNav>
    </SidebarContainer>
  );
};

export default Sidebar;
