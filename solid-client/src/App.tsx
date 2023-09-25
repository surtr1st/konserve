import { Routes, Route } from '@solidjs/router';
import { Main, Login, Register } from './pages';

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
    </Routes>
  );
}

export default App;
