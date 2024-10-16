import axiosInstanse from "../libs/axios";

const recipesApi = {
  getAllRecipes(url) {
    return axiosInstanse.get(url);
  },
  getAllRecipesTags(url) {
    return axiosInstanse.get(url);
  },
  getRecipesByTag(url) {
    return axiosInstanse.get(url);
  },
  getSingleRecipe(url) {
    return axiosInstanse.get(url);
  }
};

export default recipesApi;
