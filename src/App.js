import { useState, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './Globalstyled';
import Router from './routes/Router';
import Splash from './layouts/Splash/Splash';

function App() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 1800);
  }, []);

  return (
    <>
      {show && <Splash />}
      <RecoilRoot>
        <GlobalStyle />
        <Router />
      </RecoilRoot>
    </>
  );
}

export default App;
