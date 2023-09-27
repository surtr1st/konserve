import { Routes, Route } from '@solidjs/router';
import { Main, Login, Register, Preference, DetailNode } from './pages';

function App() {
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
