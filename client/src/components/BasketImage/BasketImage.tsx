import React, {PropsWithChildren} from 'react';
import {Figure} from "react-bootstrap";
import styles from "./BasketImage.module.css"
import {getStaticPath} from "../../utils";

interface BasketImageProps extends PropsWithChildren {
    alt: string,
    imageUrl: string,
}

const BasketImage: React.FC<BasketImageProps> = ({imageUrl, alt}) => {
    return (
        <Figure className={`${styles['b-basket-image-figure']}`}>
            <Figure.Image className={`m-0 ${styles['b-basket-image']}`}
                          src={`${getStaticPath()}/${imageUrl}`}
                          width={30}
                          height={30}
                          alt={alt}
            />
        </Figure>
    )
}

export default BasketImage;