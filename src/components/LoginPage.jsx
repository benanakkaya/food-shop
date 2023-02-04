
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { fetchUsers, setLogin } from '../redux/users/usersSlice';


export default function LoginPage() {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const status = useSelector((state) => state.users.status);

    const navigate = useNavigate();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUsers());
        }
    }, [status])

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: (values) => {
            if (values.username === "" || values.password === "") {
                return false
            }
            else {
                const targetUser = users.filter((e) => e.username === values.username);
                console.log(targetUser)
                console.log(values)
                if (targetUser[0].length === 0 || targetUser[0].password !== values.password) {
                    alert("Hatalı bilgi girdiniz");
                    return false;
                }
                else {
                    alert("Başarıyla giriş yaptınız.");
                    localStorage.setItem("username",JSON.stringify(values.username));
                    localStorage.setItem("admin", JSON.stringify(targetUser[0].admin) )
                    dispatch(setLogin(true));
                    setTimeout(() => {
                        navigate("/");
                    }, 1000)
                }
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
                            <label htmlFor="password">Parola:</label>
                            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} style={{ width: "10rem", marginLeft: "1rem", marginRight: "1" }} /> <br />
                        </div>
                        <div style={{ marginTop: "2rem", float: "right" }}>
                            <button className="btn btn-primary" style={{ marginRight: "1rem" }} >Giriş Yap</button>
                            <Link className="btn btn-danger" to="/" style={{ marginRight: "1rem" }} >İptal</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


