import React, {useState, useEffect} from 'react'
import axios from "axios"

const Reviews = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
     fetchReviews()
    }, [])
   const fetchReviews = async() => {
    try {
      const response = await axios.get("/reviews")
      setReviews(response.data.flatMap(item => item.reviews))
    } catch (error){
        console.log(error)
    }
   }
   console.log(reviews)
  return (
    <div>
      Reviews
    </div>
  )
}

export default Reviews
