import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import './carousel.css'

function Carousel({ data }) {
    const [index, setIndex] = useState(0);
    const length = data.length
    const handlePrevious = () => {
        setIndex((prev) => prev - 1 < 0 ? length - 1 : (prev - 1) % length)
    };
    const [mousedOver, setMousedOver] = useState(true);

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % length)
    };

    useEffect(() => {
        // set an interval timer if we are currently moused over
        if (mousedOver) {
            const timer = setInterval(() => {
                handleNext()
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [mousedOver]);

    return (
        <div className="w-auto carousel bg-black text-white"
            onMouseOver={() => setMousedOver(false)}
            onMouseOut={() => setMousedOver(true)}>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
            <p>{data[index]?.name}</p>
            <img className="w-full h-full" src={data[index]?.source} alt={data[index]?.name} />
        </div>
    );
}

Carousel.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        source: PropTypes.string,
    }))
}

Carousel.defaultProps = {
    data: [],
    length: 0,
}


export default Carousel;