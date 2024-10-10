import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
// import AboutLayout from './ui/AboutLayout';
// import ProfileDetailsLayout from './features/ProfileDetails/components/ProfileDetailsLayout';
import ProfileDetails from './pages/ProfileDetails';
import Features from './pages/Features';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/mainlayout';

// import FeaturesLayout from './features/features/components/FeaturesLayout';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            {/* <Route path="/about-us" element={<AboutLayout />}></Route> */}
            <Route path="/profile-details" element={<ProfileDetails />} />

            {/* <Route
                path="/profile-details"
                element={<ProfileDetailsLayout />}
              ></Route> */}
            <Route path="/features" element={<Features />} />
            {/* <Route path="/features" element={<FeaturesLayout />}>
                <Route index element={<Features />} />
              </Route> */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="light"
        icon={true}
        draggablePercent={100}
      />
    </QueryClientProvider>
  );
}

export default App;
