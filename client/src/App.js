import {
    BrowserRouter,
    Routes as Switch,
    Route,
    Navigate as Redirect,
} from 'react-router-dom';

import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { Navbar } from './components/Navbar';
import Redeem from './components/Redeem';
import Home2 from './pages//home/Home2';
import Recipe from './pages/details/UserDetails';
import Create from './pages/create/Create';
function App() {
    const { user } = useAuthContext();
    console.log(user);

    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route
                        exact
                        path='/'
                        element={user ? <Home /> : <Redirect to='/login' />}
                    />
                    <Route
                        exact
                        path='/login'
                        element={user ? <Redirect to='/' /> : <Login />}
                    />
                    <Route path='/register' element={<Signup />} />
                    <Route path='/marketplace' element={<Home2 />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/market/:id' element={<Recipe />} />
                    <Route
                        path='/redeem'
                        element={!user ? <Login /> : <Redeem />}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
