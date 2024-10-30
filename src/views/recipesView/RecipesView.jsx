import React, { useEffect, useState } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import Card from "../../components/card/Card";
import recipesApi from "../../services/api";
import { Paginator } from "primereact/paginator";
import Error from "../../components/error/Error";
import { useDebounce } from "primereact/hooks";
import noFoodFound from "../../assets/img/empty.webp";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import "./recipesView.scss";

const RecipesView = () => {
  const [recipes, setRecipes] = useState(null);
  const [total, setTotal] = useState(0);
  const [error, serError] = useState("");
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [keyword, debouncedValue, setKeyword] = useDebounce("", 400);

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  const getAllRecipes = async (offset = 0) => {
    setLoading(true);
    try {
      const { data } = await recipesApi.getAllRecipes(
        `?limit=12&skip=${offset}&select=name,image,rating,reviewCount,mealType,tags&delay=500`
      );
      setRecipes(data.recipes);
    } catch (error) {
      serError(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSearchRecipes = async () => {
    setLoading(true);
    try {
      const { data } = await recipesApi.getSearchRecipes(
        `/search?q=${keyword}&limit=12&select=name,image,rating,reviewCount,mealType,tags&delay=500`
      );
      setRecipes(data.recipes);
      setTotal(data.total);
    } catch (error) {
      serError(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllRecipes(first);
  }, [first]);

  useEffect(() => {
    getSearchRecipes();
  }, [debouncedValue]);

  return (
    <section className="recipes">
      <div className="container">
        <div className="recipes__top">
          <h2 className="recipes__top-title title">Recipes</h2>
          {debouncedValue && (
            <p className="recipes__top-count">
              On request "{debouncedValue}", total results: {total}
            </p>
          )}
          <IconField className="recipes__top-input">
            <InputIcon className="pi pi-search"></InputIcon>
            <InputText
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Search recipes"
              value={keyword}
            />
          </IconField>
        </div>
        {error && <Error message={error} />}
        {!total && !loading && (
          <div className="emptyImage">
            <img
              src={noFoodFound}
              alt="no food found"
              width="300"
              loading="lazy"
            />
          </div>
        )}
        <div className="recipes__cards cards">
          {loading && <SkeletonCard count={8} />}
          {recipes?.map((item) => (
            <Card key={item.id} info={item} loading={loading} />
          ))}
        </div>
        {total > 12 && (
          <Paginator
            first={first}
            rows={12}
            totalRecords={total}
            onPageChange={onPageChange}
            className="recipes__paginator"
          />
        )}
      </div>
    </section>
  );
};

export default RecipesView;
