import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

a {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: none;
  }
  `;
