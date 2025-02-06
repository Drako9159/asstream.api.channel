
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollTopTop from "./hooks/useScroll";
import Movies from "./page/Movies";
import Watcher from "./page/Watcher";
import WatcherIptv from "./page/WatcherIptv";
import Dashboard from "./page/Dashboard";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./page/NotFoundPage";
import { Theme } from "@radix-ui/themes";
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


      <Theme>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<Watcher />} />
          <Route path="/iptvs/:id" element={<WatcherIptv />} />
          <Route path="/dashboard" element={<Dashboard />} />s
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Theme>
    </BrowserRouter>
  );
}
