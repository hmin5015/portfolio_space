import styled from 'styled-components';
import { media } from '../utils/MediaQuery';

const Container = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--ui-background);
  border-bottom: 1px solid var(--GTrans-02);

  ${media.sm`
    flex-direction: column;
  `}
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 45px;
  padding: 0 25px;
`;

const HeaderTitle = styled.h1`
  font-size: 16px;
  margin: 0;
`;

const Nav = styled.nav`
  display: block;

  ${media.md`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 130;
    transform: translateZ(0);
    border-top: 1px solid #E2E2E2;
  `}

  ul {
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  
    ${media.md`
      margin: 0 auto;
      width: 100%;
      max-width: 500px;
      height: 50px;
      font-size: 14px;
    `}

    li {
      padding: 5px;
  
      a {
        padding: 12px 24px;

        ${media.md`
          padding: 12px 10px;
        `}
      }
    }
  }
`;

const Setting = styled.div`
  margin-left: auto;

  a {
    margin-left: 0.5rem;
  }
`;

const mainMenus = [
  { title: '홈', link: '/' },
  { title: '피드', link: '/feed' },
  { title: '검색', link: '/search' },
  { title: '관리', link: '/manage' },
];

export const Header = () => {
  return ( 
    <Container>
      <Section>
        <HeaderTitle>LOGO</HeaderTitle>
        <Nav>
          <ul>
            {mainMenus.map((menu) => (
              <li key={menu.title}>
                <a href={menu.link}>{menu.title}</a>
              </li>
            ))}
          </ul>
        </Nav>
        <Setting>
          <a href="#">알림</a>
          <a href="#">로그아웃</a>
        </Setting>
      </Section>
    </Container>
  )
}