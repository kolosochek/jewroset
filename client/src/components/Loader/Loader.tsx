import {Spinner} from "react-bootstrap";

export interface ILoader {

}

export const Loader = ({}: ILoader) => {
    return (
        <>
            <section className="d-flex justify-content-center align-items-center flex-grow-1">
                <Spinner animation={"grow"}/>
            </section>
        </>
    )
}