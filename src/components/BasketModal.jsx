import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { setPortionError, addBasket, updateBasket, setPortion, setBasketItem } from '../redux/foods/foodsSlice';



export default function BasketModal({ modalState, setModalState }) {

    const dispatch = useDispatch();
    const myBasket = useSelector((state) => state.foods.basket);
    const basketFood = useSelector((state) => state.foods.basketFood);
    const basketItem = useSelector((state) => state.foods.basketItem);
    const portionError = useSelector ((state) => state.foods.portionError)

    console.log("my basket" + myBasket)


    const handleDeny = (food) => {
        console.log(myBasket)
        if (myBasket.filter((i) => i.id === food.id).length >= 1) {
            if (basketItem > food.portion) {
                console.log("Porsiyon Yetersiz...");
                dispatch(setPortionError(true));
                setTimeout(() => {
                    dispatch(setPortionError(false));
                }, 1500);
                return false;
            }
            else {
                const targetIndex = myBasket.findIndex((i) => i.id === food.id);
                dispatch(updateBasket([targetIndex, basketItem]));
                const newPortion = food.portion - basketItem;
                dispatch(setPortion([food.id, newPortion]));
            }

        }
        else {
            if (basketItem > food.portion) {
                console.log("Porsiyon Yetersiz...");
                dispatch(setPortionError(true));
                setTimeout(() => {
                    dispatch(setPortionError(false));
                }, 1500)
                return false;
            }
            else {
                const newPortion = food.portion - basketItem;
                dispatch(setPortion([food.id, newPortion]))
                dispatch(addBasket({ id: food.id, name: food.name, quantity: basketItem, price: food.price, image: food.image, quantitySold: food.quantitySold  }));
            }
        }

        dispatch(setBasketItem(1));
        setModalState(false);
        localStorage.setItem("basket",JSON.stringify(myBasket));
    }

    const handleClose = () => {
        setModalState(false);
         dispatch(setBasketItem(Number(1)))
    }


    return (
        <>
            {basketFood.portion > 0 ?
                <Modal isOpen={modalState} >
                    <ModalHeader >{basketFood.name}</ModalHeader>
                    <ModalBody>
                        <div className='col-md-12' style={{ display: "flex" }}>
                            <div className='col-md-2' style={{ display: "flex", alignItems: "center" }}>
                                <img style={{ width: "12rem" }} src={basketFood.image} alt={basketFood.name} />
                            </div>
                            <div className='col-md-4'>
                            </div>
                            <div className='col-md-5'>
                                <h5 style={{ fontStyle: "italic", marginTop: "1rem" }}>İçindekiler:</h5>
                                <hr />
                                <p>{basketFood.ingredients}</p>
                            </div>
                        </div>
                        <div >
                            <h5 style={{ fontStyle: "italic", marginTop: "1rem" }}>Fiyatlandırma</h5>
                            <hr />
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center", padding:"0rem 1rem"}}>
                            <div>
                                <label style={{fontSize:"1.5rem", marginRight:"1rem"}}>Adet: </label>
                                <input value={basketItem} onChange={(e) => dispatch(setBasketItem(Number(e.target.value)))} style={{ width: "2rem", textAlign: "center" }} />
                            </div>
                            <div>
                                <strong style={{fontSize:"1.5rem"}} >Tutar: {basketItem*basketFood.price} ₺</strong>
                            </div>
                            </div>
                            <small style={{marginLeft:"1rem",fontStyle:"italic",fontSize:"0.8rem"}}>Elimizdeki Tahmini Porsiyon Miktarı : {basketFood.portion} </small>
                        </div>


                    </ModalBody>
                    <ModalFooter className='col-md-12'>
                        <div style={{ display: "flex" }}>
                            <div>
                                {portionError === true ? <small style={{fontStyle:"italic",color:"red",marginRight:"1rem"}}>Porsiyon sayımız yetersiz...</small>:null}
                                <Button onClick={() => handleDeny(basketFood)} color="primary">
                                    Onayla
                                </Button>{' '}
                                <Button color="secondary" onClick={() => handleClose()}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </ModalFooter>
                </Modal>
                : null}
        </>
    )
}


