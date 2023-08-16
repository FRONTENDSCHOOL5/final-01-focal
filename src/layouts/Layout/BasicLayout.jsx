import React from 'react';
import styled from 'styled-components';
import TitleHeader from '../../layouts/Header/TitleHeader';

const Container = styled.div`
  height: 100vh;
  padding: 30px 0px;
  overflow-y: auto;
`;

const Main = styled.main`
  width: 100%;

  & > section {
    max-width: 322px;
    width: calc(100% - 34px * 2);
    margin: 0 auto;

    & > button {
      display: block;
      margin: 30px auto 0;
    }

    & > .signup-link {
      font-weight: 400;
      font-size: 12px;
      color: var(--sub-text-color);
      display: block;
      width: 100%;
      text-align: center;
    }
  }
`;

export default function BasicLayout({ headerProps, description, children }) {
  return (
    <Container>
      <TitleHeader subText={headerProps.subText}>
        {headerProps.title}
      </TitleHeader>
      <Main>
        <section>
          <h2 className="a11y-hidden">{description}</h2>
          {children}
        </section>
      </Main>
    </Container>
  );
}
