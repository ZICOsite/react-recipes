import React from "react";

const MealTypeView = () => {
  return (
    <section className="mealType">
      <div className="container">
        <div className="mealType__top">
          <h2 className="mealType__top-title title">
            Meal type
          </h2>
        </div>
        {/* {error && <Error message={error} />} */}
        <div className="mealType__cards cards">
          {/* {category?.map((item) => (
            <Card info={item} key={item.id} loading={loading} />
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default MealTypeView;
