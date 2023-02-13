import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { setCommentsModalState, setComment, updateTargetComments, deleteComment, deleteCom } from "../redux/foods/foodsSlice"


function CommentsModal() {
    const dispatch = useDispatch();
    const modalState = useSelector((state) => state.foods.commentsModalState);
    const loginned = useSelector((state) => state.users.loginned);
    var comments = useSelector((state) => state.foods.targetComments[0]);
    const targetId = useSelector((state) => state.foods.targetComments[1])
    const admin = JSON.parse(localStorage.getItem("admin"));
    const username = JSON.parse(localStorage.getItem("username"));
    const [com, setCom] = useState("");
    const [rating, setRating] = useState(10);





    const handleAddComment = (e) => {
        e.preventDefault();
        const comID = nanoid();
        dispatch(updateTargetComments([com, username, rating, targetId, comID]));
        dispatch(setComment([comments, targetId, com, username, rating, comID]));
        setCom("");
        setRating(10);
    }

    const handleDelete = (comment) => {
        dispatch(deleteComment([comments, targetId, comment]))
        dispatch(deleteCom(comment.id));
    }



    return (
        <>
            <Modal isOpen={modalState} >
                <ModalHeader >Yorumlar : </ModalHeader>
                <ModalBody >
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {loginned === true ?
                                <form>
                                    <select onChange={(e) => setRating(e.target.value)} value={rating} id="rating" style={{ marginRight: "0.5rem" }}>
                                        <option value={10}>10</option>
                                        <option value={9}>9</option>
                                        <option value={8}>8</option>
                                        <option value={7}>7</option>
                                        <option value={6}>6</option>
                                        <option value={5}>5</option>
                                        <option value={4}>4</option>
                                        <option value={3}>3</option>
                                        <option value={2}>2</option>
                                        <option value={1}>1</option>
                                    </select>
                                    <input placeholder='Yorum yapınız...' value={com} style={{ width: "20rem", padding: "0rem 0.2rem" }} onChange={(e) => setCom(e.target.value)}></input>
                                    <button style={{ color: "white", backgroundColor: "goldenrod", marginLeft: "0.3rem", padding: "0 0.2rem", borderRadius: "0.5rem", borderColor: "gray" }} onClick={(e) => handleAddComment(e)}>Yorum Yap</button>
                                </form>
                                : <small>Yorum yapabilmek için lütfen giriş yapınız.</small>}
                        </div>
                        <hr />
                        {comments.length > 0 ?
                            <div style={{ overflow: "auto", height: "20rem" }}>
                                {comments.map((comment, ind) => (
                                    <div key={ind} style={{ border: "0.1rem solid black", borderRadius: "0.5rem", padding: "0.4rem", marginBottom: "1rem" }}>
                                        <div style={{ padding: "0rem 0.5rem" }}>
                                            <span style={{textDecoration:"underline"}}>{comment.author}</span> <span style={{ float: "right" }}><img src={"https://cdn2.iconfinder.com/data/icons/default-1/100/.svg-4-512.png"} style={{ height: "1.2rem" }} alt="star" />{comment.rating}/10</span>
                                        </div> <br></br>
                                        <p style={{ padding: "0rem 0.5rem" }}>{comment.comment}</p>
                                        {(admin === true) || (comment.author === username) ?
                                            <div style={{ textAlign: "right", paddingRight: "0.5rem" }}>
                                                <strong style={{ color: "red", cursor: "pointer" }} onClick={() => handleDelete(comment)}>X</strong>
                                            </div>
                                            : null}
                                    </div>
                                ))}
                            </div>
                            : <div style={{ textAlign: "center" }}>
                                <small>Henüz hiç yorum yapılmamış...</small>
                            </div>}
                    </div>

                </ModalBody>
                <ModalFooter className='col-md-12'>
                    <Button color="danger" onClick={() => dispatch(setCommentsModalState(false))}>
                        Kapat
                    </Button>
                </ModalFooter>
            </Modal>

        </>
    )
}


export default CommentsModal;