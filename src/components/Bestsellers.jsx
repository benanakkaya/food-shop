import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchFoods } from '../redux/foods/foodsSlice';

export default function Bestsellers() {

    const dispatch = useDispatch();

    var foodList = useSelector((state) => state.foods.foodList);
    const status = useSelector((state) => state.foods.status)

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchFoods());
        }
    }, [dispatch, status])

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className="col-md-12">


            {foodList.slice().sort((a, b) => a.quantitySold <= b.quantitySold ? 1 : -1).map((food,ind) => (

                <div key={food.id} className='col-md-8' style={{display:"flex", backgroundColor: "azure", padding: "2rem", margin: "0.5rem auto" }} >
                    <div className='col-md-1'>
                        <h5>{ind+1}</h5>
                    </div>
                    <div className='col-md-3' style={{display:"flex",justifyContent:"left",alignItems:"center",marginRight:"2rem"}}>
                        <img style={{width:"11rem"}} src={food.image} alt={food.name} />
                    </div>
                    <div className='col-md-6' style={{ display: "flex", flexDirection: "column", textAlign: "left" }} >
                        <h3>{food.name}</h3>
                        <h5 style={{fontStyle:"italic"}}>İçindekiler: </h5>
                        <p>{food.ingredients}</p>
                        <div>
                            <a className='btn btn-primary' style={{marginRight:"1rem"}} >Yorumlar</a>
                            <a className='btn btn-success'>Satın Al</a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
