import { Link } from 'react-router-dom'
// styles
import './User.css'

export default function RecipeList({ data }) {

  return (
    
    <div className="recipe-list">
      <div className="category">
        <h3>Category:</h3>
        <select name="cars" id="cars">
        <option value="volvo">Instagram</option>
        <option value="saab">Twitter</option>
        <option value="mercedes">Tiktok</option>
        <option value="audi">Facebook</option>
</select>
      </div>
      {data.map(recipe => (
        <div key={recipe._id} className={`card`}>
          <h3>User: {recipe.user}</h3>
          <p>Price ${recipe.price}</p>
          <p>{recipe.platform}</p>
          <Link to={`/market/${recipe._id}`}>Buy</Link>
        </div>
      ))}
    </div>
  )
}