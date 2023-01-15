import React, {PropsWithChildren} from 'react';

interface SelectCountryProps extends PropsWithChildren{
    className?: string,
}

const SelectCountry:React.FC<SelectCountryProps> = (children) => {
    return (
        <>
            <label htmlFor="country" className="form-label">Country</label>
            <select className={`form-select ${children.className}`} id="country" required>
                <option value="">Choose...</option>
                <option>United States</option>
            </select>
            <div className="invalid-feedback">
                Please select a valid country.
            </div>
        </>
    )
}

export default SelectCountry;