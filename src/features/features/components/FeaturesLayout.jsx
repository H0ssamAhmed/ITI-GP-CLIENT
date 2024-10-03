import { Outlet } from 'react-router-dom';
import Navigation from '../../../ui/Navigation';
import Footer from '../../../ui/Footer';

const FeaturesLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-auto px-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesLayout;
