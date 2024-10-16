import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import recipesApi from "../../services/api";
import { Image } from "primereact/image";
import { Rating } from "primereact/rating";
import "./recipeView.scss";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import Error from "../../components/error/Error";

const RecipeView = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();
  const [error, serError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const getSingleRecipe = async () => {
    try {
      const { data } = await recipesApi.getSingleRecipe(`/${id}`);
      setRecipe(data);
    } catch (error) {
      serError(error.message);
    }
  };

  useEffect(() => {
    getSingleRecipe();
  }, []);

  return (
    <section className="recipe">
      <div className="container">
        {error && <Error message={error} />}
        {!error && (
          <div className="recipe__content">
            <div className="recipe__content-banner">
              <Image
                src={recipe?.image}
                alt={recipe?.name}
                width="300"
                preview
                loading="lazy"
                className="recipe__content-image"
              />
              <ul className="recipe__content-tags">
                {recipe?.tags.map((item) => (
                  <li className="recipe__content-item" key={item}>
                    <Tag>
                      <Link
                        to={`/categories?name=${item}`}
                        className="recipe__content-tagLink"
                      >
                        {item}
                      </Link>
                    </Tag>
                  </li>
                ))}
              </ul>
              <Rating
                className="recipe__content-rating"
                value={recipe?.rating}
                readOnly
                cancel={false}
              />
              <div className="recipe__content-btns">
                <Button
                  onClick={() => goBack()}
                  className="recipe__content-btn"
                  severity="secondary"
                >
                  Back
                </Button>
                {/* <Button className='recipe__content-cart'>Cart</Button> */}
              </div>
            </div>
            <div className="recipe__content-desc">
              <h2 className="recipe__content-name">{recipe?.name}</h2>
              <p className="recipe__content-txt _cuisine">
                Cuisine: {recipe?.cuisine}
              </p>
              <p className="recipe__content-txt _servings">
                Servings: {recipe?.servings}
              </p>
              <p className="recipe__content-txt _difficulty">
                Difficulty: {recipe?.difficulty}
              </p>
              <p className="recipe__content-txt prepTimeMinutes">
                Preparation time Minutes: {recipe?.prepTimeMinutes}
              </p>
              <p className="recipe__content-txt cookTimeMinutes">
                Cooking time minutes: {recipe?.cookTimeMinutes}
              </p>
              <p className="recipe__content-txt _caloriesPerServing">
                Calories per serving: {recipe?.caloriesPerServing}
              </p>
              <p className="recipe__content-txt reviewCount">
                Views: {recipe?.reviewCount}
              </p>
              <h3 className="recipe__content-title">Ingredients</h3>
              <ul className="recipe__content-list _ingredients">
                {recipe?.ingredients.map((item) => (
                  <li className="recipe__content-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="recipe__content-title">Instructions</h3>
              <ul className="recipe__content-list _instructions">
                {recipe?.instructions.map((item) => (
                  <li className="recipe__content-item" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipeView;
