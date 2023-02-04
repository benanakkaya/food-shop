import React, { useEffect } from 'react'
import FoodCard from './FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../redux/foods/foodsSlice';


export default function FilterFoodList() {

    const dispatch = useDispatch();
    const foodMenu = useSelector((state) => state.foods.foodList);
    const searchInput = useSelector((state) => state.foods.searchInput)

    useEffect(() => {
        dispatch(fetchFoods());
   
    }, [dispatch])  


   
    
   

    return (
        <div className='container mt-3'>
            <div className="row movie-list without-big col-md-12" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }} >

                    {foodMenu.filter((e) => e.name.toLowerCase().includes(searchInput) ).map((food) => (
                    <FoodCard key={food.id} food = {food} />
                    ))}

                

            </div>
        </div>
    )
}
