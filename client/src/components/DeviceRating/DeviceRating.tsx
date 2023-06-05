import React from "react";

export interface IDeviceRating {
    rating: number,
    color?: string,
    isRatingText?: boolean,
}

export const DeviceRating = ({rating, color="warning", isRatingText=false}: IDeviceRating) => {
    const returnRatingHTML =(rating:IDeviceRating["rating"]) => {
        let outputHTML = []
        for (let i=1; i <= 5; i++) {
            outputHTML.push(
                <i key={`rating-key-${i}`} className={`bi ${rating >= i ? 'bi-star-fill' : 'bi-star'} text-${color}`}></i>)
        }
        return outputHTML
    }


    return (
        <section className="b-rating-wrapper">
            <div className="b-rating">
                {returnRatingHTML(rating)}
                <span className="b-rating-value">{isRatingText && <span>{rating} of 5</span>}</span>
            </div>
        </section>
    )
}