import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './functions/hooks';
import { GlobalStyles } from './gobal';
import { theme } from '../styles/theme';
import {Menu, Burger} from './';
import FocusLock from 'react-focus-lock';

function MenuComponent() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

  return (
   <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div ref={node}>
        <FocusLock disabled={!open}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu open={open} setOpen={setOpen} id={menuId} />
        </FocusLock>
        </div>      
      </>
    </ThemeProvider>
  );
}

export default MenuComponent
  
