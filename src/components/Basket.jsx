import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setPayment, cleanBasket } from '../redux/foods/foodsSlice';


export default function Basket() {
    const dispatch = useDispatch();
    const loginned = useSelector((state) => state.users.loginned)
    const myBasket = useSelector((state) => state.foods.basket);
    var totalPrice = 0;
    for (var i = 0; i < myBasket.length; i++) {
        totalPrice = totalPrice + (Number(myBasket[i].price) * myBasket[i].quantity);
    }

    const paymentHandleClick = () => {
        for (var i = 0; i < myBasket.length; i++) {
            dispatch(setPayment([myBasket[i].id, myBasket[i].quantity+myBasket[i].quantitySold]))
        }
        dispatch(cleanBasket());
    }


    return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }} className="col-md-12">
            <div className="card p-3 m-2 col-md-4" style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center" }} >
                <h2>Sepetim</h2>
                <ul style={{ textAlign: "left", marginTop: "1rem", listStyle: "none", padding: "0px" }}>

                    {myBasket.length === 0 ? <strong>Sepetiniz Boş</strong> : myBasket.map((item) => (
                        <li key={item.id}> <span onClick={() => console.log("sil")} style={{ color: "red", cursor: "pointer", margin: "0rem 1rem", fontWeight: "bolder" }}>X</span>  <img src={item.image} style={{ height: "1rem" }} />  {item.name} <span style={{ float: "right" }}> {item.price}₺ x {item.quantity} </span> </li>
                    ))}

                </ul>
                <hr></hr>
                <div>
                    {loginned ?
                        <a style={{ float: "left", marginLeft: "1rem" }} onClick={() => paymentHandleClick()} className='btn btn-success'>Ödeme Yap</a> :
                        <small style={{ fontStyle: "italic" }}>Sipariş verebilmek için lütfen giriş yapınız.</small>
                    }
                    <span style={{ textAlign: "right", float: "right", }}>
                        Toplam Ücret: <i>{totalPrice} ₺</i>
                    </span>
                </div>

            </div>
        </div>
    )
}


