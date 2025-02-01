// import CardPrimaryDashboard from "../components/Dashboard/CardPrimaryDashboard";
// import ModalLogin from "../components/Dashboard/ModalLogin";
import Nav from "../components/Dashboard/Nav";
import { useDashboardStore } from "../store/dashboard";
import Search from "../components/Search/Search";
import { useState, useEffect } from "react";
import UploadIptv from "../components/Search/UploadIptv";
import IptvList from "../components/Dashboard/IptvList";
import PushCategory from "../components/Search/PushCategory";
import PushEntry from "../components/Search/PushEntry";
import PushLive from "../components/Search/PushLive";
import CategoryList from "../components/Dashboard/CategoryList";
import EntryList from "../components/Dashboard/EntryList";
import LoginForm from "../components/Dashboard/LoginForm";
import DashboardPage from "../components/Dashboard/new/DashboardPage";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {

  useDashboardStore((state) => state.checkAuth());

  const isAuth = useDashboardStore((state) => state.isAuth);

  const [title, setTitle] = useState("Dashboard");
  const [component, setComponent] = useState("movies");

  useEffect(() => {
    if (component === "movies") setTitle("Movies");
    if (component === "search") setTitle("Push Movie");
    if (component === "push-iptv") setTitle("Push IPTV");
    if (component === "iptv-list") setTitle("IPTV");

    if (component === "category-list") setTitle("Category List");
    if (component === "entry-list") setTitle("Entry List");

    if (component === "push-category") setTitle("Push Category");
    if (component === "push-entry") setTitle("Push Entry");
    if (component === "push-live") setTitle("Push Live");
  }, [component]);

  if (!isAuth) return <LoginForm />;

  return (
    <>
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
      <Nav title={title} setComponent={setComponent} />
      {component === "movies" ? (

        <DashboardPage />


      ) : component === "search" ? (
        <Search setComponent={setComponent} />
      ) : component === "push-iptv" ? (
        <UploadIptv setComponent={setComponent} />
      ) : component === "iptv-list" ? (
        <IptvList />
      ) : component === "push-category" ? (
        <PushCategory setComponent={setComponent} />
      ) : component === "push-entry" ? (
        <PushEntry setComponent={setComponent} />
      ) : component === "push-live" ? (
        <PushLive setComponent={setComponent} />
      ) : component === "category-list" ? (
        <CategoryList />
      ) : component === "entry-list" ? (
        <EntryList />
      ) : (
        ""
      )}
    </>
  );
}
