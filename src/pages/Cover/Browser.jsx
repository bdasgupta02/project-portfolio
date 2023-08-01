import { Container } from "@mui/material"
import React, { useState, useRef, useEffect } from "react"
import Tabs from "../../components/Tabs"
import data from "../../data/projects"
import Footnote from "../../components/Footnote"
import { useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { animated, useSpring } from "@react-spring/web"
import colors from "../../utils/colors"
import { useNavigate } from "react-router-dom"

const Box = ({ item, index }) => {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"))
    const navigate = useNavigate()

    const gap = 12

    const boxStyle = {
        width: isDesktop ? "50%" : "100%",
        padding: "16px",
        boxSizing: "border-box",
        cursor: "pointer",
        borderTop: `${gap}px solid white`,
        borderRight: isDesktop ? `${gap}px solid white` : "none",
        borderLeft: "none",
        alignSelf: "flex-start",
        position: "relative",
    }

    const [isHover, setHover] = useState(false)

    const hoverAnim = useSpring({
        backgroundColor: isHover ? "#1B1B1B" : "#f7f7f7",
        color: isHover ? "#FFFFFF" : "#1B1B1B",
    })

    const getColor = () => {
        if (item.priTag === "C++") {
            return colors[1]
        } else if (item.priTag === "Python") {
            return colors[3]
        } else {
            return colors[6]
        }
    }

    return (
        <animated.div
            key={index}
            style={{ ...hoverAnim, ...boxStyle }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
                navigate(`project/${item.path}`)
                window.scrollTo(0, 0)
            }}
        >
            <h3>{item.title}</h3>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <p>{item.year}</p>
                <div style={{ width: "12px" }} />
                <p style={{ color: getColor() }}>{item.priTag}</p>
            </div>
        </animated.div>
    )
}

const Browser = () => {
    const tabs = ["All", "C++", "Python"]
    const [activeIdx, setActiveIdx] = useState(0)
    const [minHeight, setMinHeight] = useState("auto")
    const gridRef = useRef(null)

    const updateHeight = () => {
        if (gridRef.current) {
            const currentHeight = gridRef.current.offsetHeight
            if (parseInt(currentHeight) > parseInt(minHeight)) {
                setMinHeight(`${currentHeight}px`)
            }
        }
    }

    useEffect(() => {
        window.addEventListener("resize", updateHeight)
        return () => window.removeEventListener("resize", updateHeight)
    }, [minHeight])

    useEffect(() => {
        if (
            tabs[activeIdx] === "All" &&
            gridRef.current &&
            minHeight === "auto"
        ) {
            setMinHeight(`${gridRef.current.offsetHeight}px`)
        }
    }, [activeIdx, minHeight])

    let processed = []
    if (tabs[activeIdx] === "All") {
        processed = data
    } else {
        processed = data.filter((e) => e.priTag === tabs[activeIdx])
    }

    const gridStyle = {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        minHeight: minHeight,
        overflowY: "auto",
        alignItems: "flex-start",
        alignContent: "flex-start",
    }

    return (
        <Container className="text-grey" maxWidth="md">
            <Tabs
                style={{ margin: "42px 0px 24px 0px" }}
                tabs={tabs}
                idx={activeIdx}
                setIdx={setActiveIdx}
            />
            <div style={gridStyle} ref={gridRef}>
                {processed.map((item, index) => (
                    <Box item={item} index={index} />
                ))}
            </div>
            <Footnote />
        </Container>
    )
}

export default Browser
