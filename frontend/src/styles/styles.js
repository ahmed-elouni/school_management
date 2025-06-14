// styles.js
import styled from 'styled-components';

export const Navbar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

export const Logo = styled.img`
  width: 60px;
  height: auto;
`;

export const NavigationLinks = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLink = styled.a`
  margin: 0 15px;
  font-size: 17px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #007BFF;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginButton = styled.button`
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: 15px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  min-height: 100vh;
  padding-top: 80px;
`;

export const HeroSection = styled.section`
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 40px;
`;

export const Section = styled.section`
  padding: 80px 20px;
  text-align: center;
  background-color: ${({ alternate }) => (alternate ? '#f9f9f9' : '#fff')};
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  color: #1c1c1c;
  margin-bottom: 30px;
`;

export const SectionText = styled.p`
  max-width: 800px;
  margin: 0 auto;
  font-size: 20px;
  line-height: 1.8;
  color: #444;
`;

export const FooterContainer = styled.footer`
  background-color: #f5f5f5;
  color: #333;
  padding: 60px 20px;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 10px 20px;
`;

export const FooterTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  color: #2c3e50;
`;

export const FooterItem = styled.p`
  font-size: 16px;
  margin: 8px 0;

  a {
    color: #007BFF;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
