import * as d3 from "d3"

type HistogramPropsI = {
    width: number;
    height: number;
    data: number[];
};

export const Histogram = ({ width, height, data }: HistogramPropsI) => {

    // read the data
    // build buckets from the dataset
    // build the scales
    // build the rectangles

    return (
        <div>
            <svg width={width} height={height}>

            </svg>
        </div>
);
};