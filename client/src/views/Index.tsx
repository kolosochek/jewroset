import React from 'react';
import Sidebar from "../components/Sidebar";
import Category from "../components/Category";

const Index = () => {

    return (
        <section className="content flex-row d-inline-flex">
            <Sidebar />
            <Category categoryItems={[1,2,3,4,5,6,7,8,9]}/>
        </section>
    )
}

export default Index;