import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import recipesApi from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import "./categoriesView.scss";
import Card from "../../components/card/Card";
import Error from "../../components/error/Error";
import { useDebounce } from "primereact/hooks";
import noFoodFound from "../../assets/img/empty.webp";
import SkeletonCard from "../../components/skeleton/SkeletonCard";
import { Paginator } from "primereact/paginator";

const CategoriesView = () => {
  const [tags, setTags] = useState(null);
  const [selectedTag, debouncedValue, setSelectedTag] = useDebounce(null, 400);
  const [category, setCategory] = useState(null);
  const [total, setTotal] = useState(0);
  const [first, setFirst] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const onPageChange = (event) => {
    setFirst(event.first);
  };

  const getAllRecipesTags = async () => {
    try {
      const { data } = await recipesApi.getAllRecipesTags("/tags");
      setTags(data);
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    }
  };

  const getRecipesByTag = async (cuisene) => {
    setLoading(true);
    try {
      const { data } = await recipesApi.getRecipesByTag(
        `/tag/${cuisene}?select=name,image,rating,reviewCount,mealType`
      );
      setCategory(data.recipes);
      setTotal(data.total);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRecipesTags();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    if (name) {
      setSelectedTag(name);
    } else {
      getRecipesByTag("Asian");
    }
  }, [navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (selectedTag) {
      params.set("name", debouncedValue);
      navigate(`?${params.toString()}`, {state: "test"});
      getRecipesByTag(debouncedValue);
    }
  }, [debouncedValue, navigate]);

  return (
    <section className="categories">
      <div className="container">
        <div className="categories__top">
          <h2 className="categories__top-title title">
            Category {selectedTag}
          </h2>
          {!category?.length && !loading && (
            <p className="categories__top-empty">Select category</p>
          )}
          <Dropdown
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.value)}
            options={tags}
            editable
            placeholder="Select a category"
            disabled={error}
          />
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
        <div className="categories__cards cards">
          {loading && <SkeletonCard count={8} />}
          {category?.map((item) => (
            <Card info={item} key={item.id} loading={loading} />
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

export default CategoriesView;
