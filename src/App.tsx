import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Board from "./components/Board/Board";
import { styled } from "styled-components";

const StyledMain = styled.main`
  display: grid;
  place-items: center;
  height: 100%;
  padding: 2rem;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <StyledMain>
        <Board />
      </StyledMain>
    </>
  );
};

export default App;
