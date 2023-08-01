import React, { useState, useEffect } from "react"
import { useSpring, animated, config } from "@react-spring/web"

const Scroller = () => {
    const word = "scroll below"
    const letters = word.split("")
    const [activeIndex, setActiveIndex] = useState(0)

    const springs = letters.map((_, index) =>
        useSpring({
            fontWeight: index === activeIndex ? 700 : 200,
            config: config.slow,
        })
    )

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % letters.length)
        }, 400)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <h3 className="text-accent">
            {letters.map((letter, index) => (
                <animated.span key={index} style={springs[index]}>
                    {letter}
                </animated.span>
            ))}
        </h3>
    )
}

export default Scroller
