import { useLocation, useNavigate, useParams } from "react-router-dom";
import CategoriesView from "../views/categoriesView/CategoriesView";

const ContactPage = () => {
  const params = useParams()
  const nav = useNavigate()
  const loc = useLocation()
  console.log(loc);
  
  return (
    <main>
      <CategoriesView />
    </main>
  );
};

export default ContactPage;
