import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import SupportButton from '../SupportButton/SupportButton';

export default function Layout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, position: 'relative' }}>
        <Outlet />
      </main>
      <Footer />
      <SupportButton />
    </div>
  );
}
