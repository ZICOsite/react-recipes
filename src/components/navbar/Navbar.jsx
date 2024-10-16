import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.scss"

const pages = [
    {
        path: "/",
        name: "Home"
    },
    {
        path: "/categories?name=Asian",
        name: "Categories"
    },
]

const Navbar = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="container">
            <Link to="/" className="nav__logo">Recipes</Link>
            <div className="nav__menu">
                <ul className="nav__list">
                    {pages.map((page) => (
                    <li className="nav__item" key={page.name}>
                        <NavLink to={page.path} className="nav__link">{page.name}</NavLink>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
