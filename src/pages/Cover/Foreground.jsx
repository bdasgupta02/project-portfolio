import React, { useState, useEffect } from "react"
import Scroller from "./Scroller"
import { useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"

const Foreground = () => {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"))

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

    const parallaxOffset = scrollY / 2

    return (
        <div
            style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    transform: `translateY(-${parallaxOffset}px)`,
                    margin: '16px',
                }}
            >
                <div style={{ flex: 1 }}></div>
                {isDesktop ? (
                    <h1
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        Hello world! I'm&nbsp;
                        <span style={{ fontWeight: "bold" }}>
                            Bikramjit Dasgupta
                        </span>
                        ,
                    </h1>
                ) : (
                    <>
                        <h1
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-start",
                            }}
                        >
                            Hello world!
                        </h1>
                        <h1
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                fontWeight: "bold",
                            }}
                        >
                            I'm Bikramjit Dasgupta
                        </h1>
                    </>
                )}
                <h2
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: isDesktop ? "center" : "flex-start",
                    }}
                >
                    and these are some of my projects
                </h2>
                <div style={{ flex: 1 }}></div>
            </div>
            <div style={{ margin: "24px 14px 14px 14px" }}>
                <Scroller />
            </div>
        </div>
    )
}

export default Foreground
