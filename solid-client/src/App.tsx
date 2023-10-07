import { Routes, Route, useNavigate } from '@solidjs/router';
import { Main, Login, Register, Preference, DetailNode } from './pages';
import { onMount } from 'solid-js';
import { useAuth } from './services';

function App() {
  onMount(() => {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    console.log(isAuth());
    if (!isAuth()) navigate('/login');
  });
  return (
    <Routes>
      <Route
        path='/'
        component={Main}
      />
      <Route
        path='/login'
        component={Login}
      />
      <Route
        path='/register'
        component={Register}
      />
      <Route
        path='/preferences'
        component={Preference}
      />
      <Route
        path='/node'
        component={DetailNode}
      />
    </Routes>
  );
}

export default App;
