// import CardPrimaryDashboard from "../components/Dashboard/CardPrimaryDashboard";
// import ModalLogin from "../components/Dashboard/ModalLogin";

import { useDashboardStore } from "../store/dashboard";

import DashboardPage from "../components/Dashboard/new/DashboardPage";
import LoginForm from "../components/Dashboard/LoginForm";

export default function Dashboard() {

  useDashboardStore((state) => state.checkAuth());
  const isAuth = useDashboardStore((state) => state.isAuth);

  /*
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
  );*/
  if (!isAuth) return <LoginForm />;
  return <DashboardPage />;
}
