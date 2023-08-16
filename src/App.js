import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './Globalstyled';
import Router from './routes/Router';

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </>
  );
}

export default App;
