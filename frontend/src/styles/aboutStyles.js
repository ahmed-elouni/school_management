// styles/aboutStyles.js
import styled from 'styled-components';

export const PageContainer = styled.div`
  padding-top: 100px;
`;

export const Section = styled.section`
  padding: 80px 20px;
  background-color: #fff;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 36px;
  color: #1c1c1c;
  margin-bottom: 40px;
`;

export const ReasonsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ReasonCard = styled.div`
  background: #f9f9f9;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ReasonIcon = styled.div`
  font-size: 40px;
  color: #007BFF;
  margin-bottom: 20px;
`;

export const ReasonTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

export const ReasonText = styled.p`
  font-size: 16px;
  color: #555;
`;
export const HeroBanner = styled.div`
  width: 100%;
  height: 50vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const HeroText = styled.h1`
  position: relative;
  z-index: 1;
  color: #fff;
  font-size: 42px;
  text-align: center;
`;
