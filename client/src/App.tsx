import Layout from "./components/extra/Layout";
import Wrapper from "./components/extra/Wrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/extra/NotFound";
import ScrollTopTop from "./hooks/useScroll";
import HomePage from "./page/HomePage";
import Movies from "./page/Movies";
import Watcher from "./page/Watcher";
import WatcherIptv from "./page/WatcherIptv";
import Dashboard from "./page/Dashboard";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTopTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4aed88',
              secondary: '#363636',
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: '#ff4b4b',
              secondary: '#363636',
            },
          },
        }}
      />



      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<Watcher />} />
        <Route path="/iptvs/:id" element={<WatcherIptv />} />
        <Route path="/dashboard" element={<Dashboard />} />s
        <Route path="*" element={<NotFound />} />
      </Routes>

    </BrowserRouter>
  );
}
