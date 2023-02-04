import Navbar from './components/Navbar'
import FoodList from './components/FoodList'
import Basket from './components/Basket'
import FilterFoodList from './components/FilterFoodList';
import RegisterPage from './components/RegisterPage';
import LoginPage from "./components/LoginPage"
import Bestsellers from './components/Bestsellers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import { setLogin } from './redux/users/usersSlice';
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    var loginned = localStorage.getItem("loginned");
    loginned = JSON.parse(loginned);
    console.log(loginned)
    if(loginned !== true){
      loginned = false;
      dispatch(setLogin(loginned))
    }
    else{
      loginned = true;
      dispatch(setLogin(loginned))
    }

  })


  return (
    <div className="App" >


      <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/basket" element={<Basket />} />
        <Route path="/bestsellers" element={<Bestsellers />} />
        <Route path="/:searchValue" element={<FilterFoodList/>} />
        <Route path="/kayit-ol" element={<RegisterPage/>} />
        <Route path="/giris-yap" element={<LoginPage/>} />
        <Route exact path="/" element={<FoodList />} />
      </Routes>
      

      </BrowserRouter>
    </div>
  );
}

export default App;
