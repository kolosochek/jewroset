import React, {PropsWithChildren} from 'react';
import {Figure} from "react-bootstrap";
import styles from "./BasketImage.module.css"

interface BasketImageProps extends PropsWithChildren {
    alt: string,
    imageUrl: string,
}

const BasketImage: React.FC<BasketImageProps> = ({imageUrl, alt}) => {
    return (
        <Figure className={`${styles['b-basket-image-figure']}`}>
            <Figure.Image className={`m-0 ${styles['b-basket-image']}`}
                          src={`${process.env.REACT_APP_SERVER_URL}/${imageUrl}`}
                          width={30}
                          height={30}
                          alt={alt}
            />
        </Figure>
    )
}

export default BasketImage;