import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import AboutLayout from './ui/AboutLayout';
import ProfileDetailsLayout from './features/ProfileDetails/components/ProfileDetailsLayout';
import ProfileDetails from './pages/ProfileDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutLayout />}>
              <Route index element={<About />} />
            </Route>
            <Route path="/profile-details" element={<ProfileDetailsLayout />}>
              <Route index element={<ProfileDetails />} />
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
      </div>
    </QueryClientProvider>
  );
}

export default App;
