import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setSearchInput } from '../redux/foods/foodsSlice';
import { setLogin } from '../redux/users/usersSlice';



export default function Navbar() {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState("");
    const loginned = useSelector((state) => state.users.loginned);
    const username = JSON.parse(localStorage.getItem("username"));

    console.log(loginned)
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchInput(searchValue));
    }

    return (
        <nav className="navbar navbar-expand-lg bg-primary" style={{ height: "6rem", border: "0.1rem solid darkgray" }}>
            <div className="container-fluid">
                <img className='ms-2' alt="logo" src={require("../images/example_logo.png")} style={{ width: "5rem" }} />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ms-4" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-light" aria-current="page" to="/">Ana Sayfa</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/basket">Sepetim</Link>
                        </li>

                        <li className="nav-item">
                            <Link className='nav-link text-light' to="/bestsellers">Çok Satanlar</Link>
                        </li>
                    </ul>
                    <form className="d-flex me-4" role="search" onSubmit={(e) => handleSubmit(e)}>
                        <input className="form-control me-2" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="search" placeholder="Arama yap..." aria-label="Search" />
                        <Link className="btn btn-outline-light" to={`/${searchValue.toLowerCase().replace(/ /g, "-")}`} type="submit">Ara</Link>
                    </form>
                    <span className='user-events ms-4'>
                        {loginned ?
                            <span style={{display:"flex",marginLeft:"1rem", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                                <small style={{color:"goldenrod"}} >Hoşgeldin {username} </small>
                                <Link className="btn bg-danger text-white" style={{marginTop:"0.3rem"}} onClick={() => dispatch(setLogin(false))} to="/" type="submit">Çıkış Yap</Link>
                            </span> :
                            <span>
                                <Link className="btn bg-danger text-white" to="/giris-yap" type="submit">Giriş Yap</Link>
                                <Link className="btn bg-info text-white ms-4 me-4" to="/kayit-ol" type="submit">Kayıt Ol</Link>
                            </span>
                        }
                    </span>
                </div>
            </div>
        </nav>
    )
}
