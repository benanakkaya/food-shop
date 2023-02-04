import { nanoid } from '@reduxjs/toolkit'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { setUsers } from '../redux/users/usersSlice';
export default function RegisterPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            id: nanoid(),
            username: "",
            password: "",
            password2: "",
            email: ""
        },
        onSubmit: (values) => {
            if ((values.username === "" || values.password === "" || values.password2 === "" || values.email === "") || (values.password !== values.password2)) {
                return false
            }
            else {
                dispatch(setUsers({ id: values.id, username: values.username, password: values.password, email: values.email }));
                setTimeout(() => {
                    navigate('/');
                }, 1000)
            }
        }

    })


    return (
        <div className='col-md-12' style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
            <div className="card p-3 m-2 col-md-3"  >
                <div className="card-body" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='col-md-8'>
                            <label htmlFor="username">Kullanıcı Adı:</label>
                            <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} style={{ width: "10rem", marginLeft: "1rem", marginRight: "1" }} /> <br />
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} style={{ width: "10rem", marginLeft: "1rem", marginRight: "1" }} /> <br />
                            <label htmlFor="password">Parola:</label>
                            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} style={{ width: "10rem", marginLeft: "1rem", marginRight: "1" }} /> <br />
                            <label htmlFor="password2">Parola (Onay):</label>
                            <input type="password" name="password2" value={formik.values.password2} onChange={formik.handleChange} style={{ width: "10rem", marginLeft: "1rem", marginRight: "1" }} /> <br />
                        </div>
                        <div style={{ marginTop: "2rem", float: "right" }}>
                            <button className="btn btn-primary" style={{ marginRight: "1rem" }} >Kayıt Ol</button>
                            <Link className="btn btn-danger" to="/" style={{ marginRight: "1rem" }} >İptal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


