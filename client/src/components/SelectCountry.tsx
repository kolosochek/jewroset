import React, {PropsWithChildren} from 'react';

interface SelectCountryProps extends PropsWithChildren{
    className?: string,
    active?: string
}

const SelectCountry:React.FC<SelectCountryProps> = ({className, active}) => {
    const countryArray = ['United States', 'Russia', 'India', 'Peru']


    return (
        <>
            <label htmlFor="country" className="form-label">Country</label>
            <select className={`form-select ${className}`} id="country" defaultValue={active ? active : undefined} required >
                <option value="">Choose...</option>
                {countryArray.map((country) => {
                    return <option key={`key-${country}`} value={country}>{country}</option>
                })}
            </select>
            <div className="invalid-feedback">
                Please select a valid country.
            </div>
        </>
    )
}

export default SelectCountry;