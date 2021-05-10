import React from "react"
import { Link } from "react-router-dom"
import image from "../notfound.jpg"

const NotFound = () => {
  return (
    <div className="not-found">
      <img src={image} alt="font found" />
      <Link to="/" className="main-link">
        Back
      </Link>
    </div>
  )
}

export default NotFound
