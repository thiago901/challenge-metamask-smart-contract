import { BrowserRouter } from 'react-router-dom';
import { Hooks } from './hooks';

import { Routes } from './routes';
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <Hooks>
        <Routes />
      </Hooks>

      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
