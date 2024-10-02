import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import MainPage from './mainPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainPage />
  </StrictMode>
);
