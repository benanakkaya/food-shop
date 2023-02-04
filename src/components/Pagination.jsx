import React from 'react'

export default function Pagination({ setCurrentPage, currentPage, totalPage }) {

    const pages = [];

    for (var i = 1; i <= totalPage; i++) {
        pages.push(i);
    }


    return (
        <nav className='mt-2' aria-label="...">
            <ul className="pagination">
                <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
                    <a href='#/' onClick={() => setCurrentPage((prev) => prev - 1)} className={"page-link"}>Geri</a>
                </li>
                {pages.map((page,ind) => (
                    <li key={ind} className={currentPage === page ? "page-item active" : "page-item"}><a className="page-link" onClick={() => setCurrentPage(page)} href="#/">{page}</a></li>
                ))}
                <li className={currentPage === pages.length ? "page-item disabled" : "page-item"}>
                    <a className="page-link" onClick={() => setCurrentPage((prev) => prev + 1)} href="#/">İleri</a>
                </li>
            </ul>
        </nav>
    )
}
