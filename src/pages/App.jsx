import "./App.css";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Admin from "./admin/Admin";
import Albums from "./albums/Albums";
import AdminLogin from "./admin/login/AdminLogin";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Album from "./album/Album";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [albums, setAlbums] = useState([]);

  const readCookie = () => {
    const admin = Cookies.get("admin");
    if (admin) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <Router>
      <Header />
      <div className="app">
        <Routes>
          <Route index path="/" element={<Navigate to="/albums" />} />
          <Route
            path="/albums"
            element={
              <Albums auth={auth} albums={albums} setAlbums={setAlbums} />
            }
          />
          <Route
            path="/admin"
            element={
              auth ? (
                <Admin setAuth={setAuth} />
              ) : (
                <Navigate to="/admin/login" />
              )
            }
          />
          <Route
            path="/admin/login"
            element={
              !auth ? (
                <AdminLogin setAuth={setAuth} />
              ) : (
                <Navigate to="/admin" />
              )
            }
          />
          <Route path="/album/:albumId" element={<Album auth={auth} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
