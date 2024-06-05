import { css, styled } from "styled-components";

export const StyledBoard = styled.div`
  display: grid;
  grid-row: 1;
  grid-column: 1;
  grid-auto-flow: row;
  gap: min(0.5rem, 2vw);
  border: 2px solid tan;
  padding: min(0.5rem, 2vw);
  border-radius: calc(min(5px, 1vw) + min(0.5rem, 2vw));
  background: antiquewhite;
`;
export const StyledRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: min(0.5rem, 2vw);
`;

export const StyledGameSection = styled.section`
  display: grid;
  grid-template-rows: auto 1fr;
  width: min(100%, 500px);
  gap: 1.25rem;
`;

export const StyledGameActions = styled.div`
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  height: auto;
`;

export const StyledGameStatus = styled.div`
  grid-row: 1;
  grid-column: 1;
  display: grid;
  place-items: center;
  backdrop-filter: blur(4px);
  margin: min(0.375rem, 1vw);
  border-radius: min(5px, 1vw);
  overflow: hidden;
  font-size: 5rem;
  font-weight: 700;
  color: #333;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
`;

export const StyledTile = styled.div<{ $empty?: boolean }>`
  aspect-ratio: 1/1;
  background: var(--color, burlywood);
  color: dimgrey;
  border-radius: min(5px, 1vw);
  display: grid;
  place-items: center;
  font-weight: 600;
  border: 2px solid var(--color, burlywood);
  cursor: pointer;
  container-type: inline-size;

  span {
    font-size: 40cqi;
  }

  &:hover {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
  }

  ${(props) =>
    props.$empty &&
    css`
      background: none;
      opacity: 0;
      pointer-events: none;
    `}
`;
