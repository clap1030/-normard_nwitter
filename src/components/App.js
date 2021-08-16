import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  //사용자정보 
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) =>{
      if(user){
        setUserObj(user);
      }
      setInit(true);
    });
  }, [])
  return (
    <>
      {init ? 
      //사용자정보 router에 파라미터로 넘기기
      <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}  /> : "Initializing...."}
      <footer>&copy; {new Date().getFullYear() } Nwitter </footer>
    </>
  );
}

export default App;
