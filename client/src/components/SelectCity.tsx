import React, {PropsWithChildren} from 'react';

interface SelectCityProps extends PropsWithChildren {
    className?: string,
    active?: string
}
const SelectCity:React.FC<SelectCityProps> = ({className, active}) => {
    const cityArray = ['Detroit', 'Philadelphia', 'New York', 'Chicago', 'Buffalo']

    return (
        <>
            <label htmlFor="city" className="form-label">City</label>
            <select className={`form-select ${className}`} id="city" defaultValue={active ? active : undefined} required >
                <option value="">Choose...</option>
                {cityArray.map((city) => {
                    return <option key={`city-${city}`} value={city}>{city}</option>
                })}
            </select>
            <div className="invalid-feedback">
                Please provide a valid city.
            </div>
        </>
    )
}

export default SelectCity;