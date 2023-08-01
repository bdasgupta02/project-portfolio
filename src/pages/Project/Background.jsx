import React, { useState, useRef, useEffect } from "react"
import { animated, useSpring, config } from "@react-spring/web"

const Backstrip = () => {
    const [opacity, setOpacity] = useState(0)
    const [isHover, setHover] = useState(false)

    const randomAnim = useSpring({
        opacity: isHover ? 1 : opacity,
        config: config.stiff,
    })

    useEffect(() => {
        if (opacity === 1) {
            setTimeout(() => setOpacity(0), 600)
        } else {
            setTimeout(
                () => setOpacity(1),
                Math.floor(Math.random() * 6000) + 1000
            )
        }
    }, [opacity])

    const hoverAnim = useSpring({
        backgroundColor: isHover ? "#2c2c2c" : "#181818",
        config: config.stiff,
    })

    return (
        <animated.div
            style={{
                height: "30px",
                zIndex: 1,
                ...randomAnim,
                ...hoverAnim,
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        />
    )
}

const Background = () => {
    const [numStrips, setNumStrips] = useState(0)
    const parentRef = useRef(null)

    useEffect(() => {
        const updateStrips = () => {
            if (parentRef.current) {
                const parentHeight = parentRef.current.clientHeight
                const strips = Math.floor(parentHeight / 20)
                setNumStrips(strips)
            }
        }

        updateStrips()
        window.addEventListener("resize", updateStrips)

        return () => {
            window.removeEventListener("resize", updateStrips)
        }
    }, [])

    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const parallaxOffset = scrollY / 3

    return (
        <div
            ref={parentRef}
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                zIndex: 1,
                transform: `translateY(${parallaxOffset}px)`,
            }}
        >
            {Array.from({ length: numStrips }).map((_, index) => (
                <Backstrip key={`Backstrip-${index}`} />
            ))}
        </div>
    )
}

export default Background
