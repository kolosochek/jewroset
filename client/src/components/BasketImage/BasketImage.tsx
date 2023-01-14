import React, {PropsWithChildren} from 'react';
import {Figure} from "react-bootstrap";
import styles from "./BasketImage.module.css"

interface BasketImageProps extends PropsWithChildren {
    imageUrl: string
}

const BasketImage: React.FC<BasketImageProps> = (imageUrl) => {
    return (
        <Figure className={`${styles['b-basket-image-figure']}`}>
            <Figure.Image className={`m-0 ${styles['b-basket-image']}`}
                          src={`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/${imageUrl.imageUrl}`}
                          width={30} height={30}/>
        </Figure>
    )
}

export default BasketImage;