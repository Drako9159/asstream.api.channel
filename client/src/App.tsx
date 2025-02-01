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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTopTop />

      <Routes>
        
        <Route path="/dashboard" element={<Dashboard />} />search
      </Routes>

      <Layout>
        <Wrapper>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<Watcher />} />
            <Route path="/iptvs/:id" element={<WatcherIptv />} />
            <Route path="/dashboard" element={<Dashboard />} />s
            <Route path="*" element={<NotFound />} />
          </Routes>

        </Wrapper>
      </Layout>


    </BrowserRouter>
  );
}
