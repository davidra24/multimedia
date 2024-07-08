import { Outlet } from 'react-router-dom';
import Navbar from './app/navbar';
import { UserProvider } from './context/useAuth';
import './styles/App.css';

export const App = () => {
  return (
    <UserProvider>
      <Navbar />
      <Outlet />
    </UserProvider>
  );
}
