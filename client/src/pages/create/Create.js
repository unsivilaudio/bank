import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// styles
import './Create.css';

export default function Create() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [emailPassword, setEmailPassword] = useState('');
    const [price, setPrice] = useState('');
    const [keyword, setKeyword] = useState([]);
    const [description, setDescription] = useState('');
    const [platform, setPlatform] = useState('');
    const [mainEmail, setMainEmail] = useState('');
    const ingredientInput = useRef(null);

    const history = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const doc = {
            user,
            password,
            emailPassword,
            price,
            keyword,
            description,
            platform,
            mainEmail,
        };

        try {
            await axios.post('http://localhost:5000/market/create/', {
                ...doc,
            });
        } catch (err) {
            console.log(err);
        }
    };

    // const handleAdd = (e) => {
    //   e.preventDefault()
    //   const ing = newIngredient.trim()

    //   if (ing && !ingredients.includes(ing)) {
    //     setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    //   }
    //   setNewIngredient('')
    //   ingredientInput.current.focus()
    // }

    return (
        <div className='create'>
            <h2 className='page-title'>Sell New User</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Username: </span>
                    <input
                        type='text'
                        onChange={e => setUser(e.target.value)}
                        value={user}
                        required
                    />
                </label>
                <label>
                    <span>Password: </span>
                    <input
                        type='password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </label>

                {/* <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input 
              type="text" 
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button onClick={handleAdd} className="btn">add</button>
          </div>
        </label> */}
                {/* <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p> */}

                <label>
                    <span>Description</span>
                    <textarea
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        required
                    />
                </label>

                <label>
                    <span>Email:</span>
                    <input
                        type='email'
                        onChange={e => setMainEmail(e.target.value)}
                        value={mainEmail}
                        required
                    />
                </label>
                <label>
                    <span>Email Password</span>
                    <input
                        type='password'
                        onChange={e => setEmailPassword(e.target.value)}
                        value={emailPassword}
                        required
                    />
                </label>
                <label>
                    <span>Price</span>
                    <input
                        type='number'
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        required
                    />
                </label>

                <button className='btn'>submit</button>
            </form>
        </div>
    );
}
