import React, {PropsWithChildren} from 'react';

interface SelectCityProps extends PropsWithChildren {
    className?: string,
}
const SelectCity:React.FC<SelectCityProps> = (children) => {
    return (
        <>
            <label htmlFor="city" className="form-label">City</label>
            <select className={`form-select ${children.className}`} id="city" required>
                <option value="">Choose...</option>
                <option>Detroit</option>
                <option>Philadelphia</option>
                <option>New York</option>
            </select>
            <div className="invalid-feedback">
                Please provide a valid city.
            </div>
        </>
    )
}

export default SelectCity;