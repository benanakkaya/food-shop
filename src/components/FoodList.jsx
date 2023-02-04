import React, { useEffect, useState } from 'react'
import FoodCard from './FoodCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../redux/foods/foodsSlice';
import BasketModal from "./BasketModal"
import CommentsModal from "./CommentsModal"
import Pagination from './Pagination';


export default function FoodList() {

    const dispatch = useDispatch();
    const foodMenu = useSelector((state) => state.foods.foodList);
    const status = useSelector((state) => state.foods.status);
    const [modalState, setModalState] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const numOfItems = 3;

    const totalPage = Math.ceil(foodMenu.length / numOfItems);
    const lastItem = currentPage * numOfItems;
    const firstItem = lastItem - numOfItems;

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchFoods());
        }
    }, [dispatch, status]);







    return (
        <div className='container mt-3 ' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="row movie-list without-big " style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }} >
                <BasketModal modalState={modalState} setModalState={setModalState} />
                <CommentsModal  />
                {foodMenu.filter((e, index) => (index >= firstItem && index < lastItem)).map((food, index) => (
                        <FoodCard key={food.id} food={food} index={index} setModalState={setModalState}  />
                ))}



            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage} />
        </div>
    )
}
