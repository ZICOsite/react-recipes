import { Link } from "react-router-dom";
import notFound from "../assets/img/not-found.webp";
import { Button } from "primereact/button";

const NotFoundPage = () => {
  return (
    <div className="notFound">
      <h2 className="notFound__title">Not found page</h2>
      <p className="notFound__txt">Sorry, we couldn't find the page.</p>
      <img src={notFound} alt="not found page" />
      <Link to="/">
        <Button label="Home" severity="secondary" />
      </Link>
    </div>
  );
};

export default NotFoundPage;
