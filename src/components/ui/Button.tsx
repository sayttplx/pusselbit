import React from "react";
import { styled } from "styled-components";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background: darkseagreen;
  color: #333;
  border: none;
  border-radius: min(5px, 1vw);
  font-size: min(1.25rem, 4vw);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.1s ease-in-out;

  &:hover {
    background: darkolivegreen;
  }
`;

const Button = ({children,onClick,}: {children: React.ReactNode; onClick: () => void;}) => 
  {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};
export default Button;
