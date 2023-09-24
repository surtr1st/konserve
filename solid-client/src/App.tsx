import { Routes, Route } from '@solidjs/router';
import { Login, Register } from './pages';

function App() {
  return (
    <Routes>
      <Route
        path='/'
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
