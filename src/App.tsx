import React, {useEffect, useState} from 'react';
import RecipeCard from './components/RecipeCard';
import { Recipe } from './Interface';
import './App.css';


const App = () => {

  const APP_ID: string = "591162ca";
  const APP_KEY: string = "938ead2ac1dedc410b2d36dc9bde80df";

  const [recipes, setRecipes] = useState<Recipe[]>([]); // purpose of generics?
  const [search, setSearch] = useState<string>(''); 
  const [query, setQuery] = useState<string>('chicken');

  // onMount & query change -> fetch recipes
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async (): Promise<void> => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default browser refresh
    setQuery(search);
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>

      <div className='recipes'>
        {recipes.map((recipe: Recipe) => (
          <RecipeCard
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>

    </div>
  );

}

export default App;
