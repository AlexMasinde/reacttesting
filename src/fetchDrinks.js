export default async function fetchDrinks(drinkName) {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
  );
  const data = await response.json();
  return data.drinks;
}
