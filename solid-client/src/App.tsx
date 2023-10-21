import { Routes, Route } from '@solidjs/router';
import {
  Main,
  Login,
  Register,
  Preference,
  DetailNode,
  SecretCodeRegister,
} from './pages';
import { Toaster } from 'solid-toast';

function App() {
  return (
    <div>
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
          path='/register/final'
          component={SecretCodeRegister}
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
      <Toaster />
    </div>
  );
}

export default App;
