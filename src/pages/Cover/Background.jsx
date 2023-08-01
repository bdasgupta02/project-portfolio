import React, { useState, useEffect, useRef } from "react"
import { useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import Backtext from "./Backtext"

const Background = () => {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

    const [isHover, setHover] = useState(false)
    const isRandom = !isDesktop || !isHover

    const [numStrips, setNumStrips] = useState(0)
    const parentRef = useRef(null)

    useEffect(() => {
        const updateStrips = () => {
            if (parentRef.current) {
                const parentHeight = parentRef.current.clientHeight
                const strips = Math.floor(parentHeight / 38)
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
                transform: `translateY(${parallaxOffset}px)`
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {Array.from({ length: numStrips }).map((_, index) => (
                <Backtext
                    key={`Backtext-${index}`}
                    index={index}
                    isRandom={isRandom}
                />
            ))}
        </div>
    )
}

export default Background
