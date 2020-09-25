import React from 'react';
import style from './recipecard.module.css';

interface RecipeCardProps {
    title: string,
    calories: number,
    image: string,
    ingredients: any
}

// why does return value use generic?
const Recipe: React.FC<RecipeCardProps> = ({ title, calories, image, ingredients }) => {
    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ul>
                {ingredients.map((ingredient: any) => (
                    <li>{ingredient.text}</li>
                ))}
            </ul>
            <p>{calories}</p>
            <img className={style.image} src={image} alt='' />
        </div>
    );
}

export default Recipe;