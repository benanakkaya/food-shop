import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  setBasketFood, setCommentsModalState, setTargetComments } from "../redux/foods/foodsSlice"

export default function FoodCard({ food, index, setModalState }) {

    const dispatch = useDispatch();

    const myBasket = useSelector((state) => state.foods.basket);

    

    const handleAddBasket = (food) => {
        dispatch(setBasketFood(food));
        setModalState(true);
    }

    const handleComment = (food) => {
        dispatch(setTargetComments([food.comments,food.id]))
        dispatch(setCommentsModalState(true));
    }

    useEffect(() => {
        localStorage.setItem("basket",JSON.stringify(myBasket));
    })




    return (
        <div className="card p-3 m-2 col-md-3"  >
            <img className="card-img-top" src={food.image} alt="food-pic" />
            <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div className='mb-2' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h5 className="card-title" style={{ fontSize: "1.4rem", marginBottom: "0px" }}>{food.name}</h5>
                    <strong href="#/" style={{ border: "0.2rem solid red", padding: "0.1rem 0.3rem", borderRadius: "20%", textDecoration: "none", color: "red", fontWeight: "bolder", fontStyle: "italic" }}>{food.price}₺</strong>
                </div>
                <p className="card-text">{food.ingredients}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <a href="#/" className="btn btn-primary" onClick={() => handleComment(food)} >Yorumlar</a>
                    <a href="#/" onClick={() => handleAddBasket(food, index)} className="btn btn-success">Sepete Ekle</a>
                </div> 
                {food.portion === 0 ?
                    <small style={{ color: "red", fontStyle: "italic " }}>Tükendi...</small>
                    : null}
            </div>
        </div>
    )
}
