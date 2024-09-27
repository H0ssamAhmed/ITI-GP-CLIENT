import { Outlet } from 'react-router-dom';
import Navigation from '../ui/Navigation';
import Footer from '../ui/Footer';

const AboutLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AboutLayout;
