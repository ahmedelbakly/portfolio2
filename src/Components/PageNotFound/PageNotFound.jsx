import React from 'react'
import { Link } from 'react-router-dom'
import "./PageNotFound.css"

const PageNotFound = () => {
  return (
    <div className='PageNotFound-container d-flex justify-content-center align-items-center'>
    <div className="">
    <h2 className="fs-1 text-light">Sorry</h2>
    <p className="fs-4 text-white-50">Page Not Found</p>
    <Link to="/portfolio/" className="fs-5 btn btn-danger px-5">Home</Link>
    </div>
    </div>
  )
}

export default PageNotFound