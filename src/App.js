import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import './Nav.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="navBar">
        <Link className="navBarMenu" to={"/"}>MY Library</Link>
        <Link className="navBarMenu" to={"/search"}>SEARCH</Link>
      </div>
      <Routes>
        <Route path="/" exact={true} element={<Home />}/>
        <Route path="/search" element={<Search />}/>
      </Routes>
    </BrowserRouter>
  );
};