import React from 'react';
import {Row} from "react-bootstrap";
import Item from "./Item";

const Category = (props:any) => {

    return (
        <section className="col-9 flex">
            <div className="album py-3">
                <div className="container">
                    <Row className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        {props.categoryItems.map(() => {
                            console.log('gotha');
                            <Item />
                        })}
                    </Row>
                </div>
            </div>
        </section>
    );
};

export default Category;