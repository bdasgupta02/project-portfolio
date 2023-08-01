import React, { useState, useEffect } from "react"
import { animated, useSpring, config } from "@react-spring/web"
import colors from "../../utils/colors"

const texts = ["machine_learning", "software::engineering", "data[science]"]

const Backtext = ({ isRandom, index }) => {
    const [isHover, setHover] = useState(false)
    const [opacity, setOpacity] = useState(0)
    const [leftFlex, setLeftFlex] = useState(Math.floor(Math.random() * 15))
    const [rightFlex, setRightFlex] = useState(Math.floor(Math.random() * 15))

    function genColor() {
        const randomIndex = Math.floor(Math.random() * colors.length)
        return colors[randomIndex] + "50"
    }

    const [textColor, setTextColor] = useState(genColor())

    const randomAnim = useSpring({
        opacity: isHover ? 1 : opacity,
        config: config.stiff,
    })

    const hoverAnim = useSpring({
        backgroundColor: isHover ? "#2c2c2c" : "#181818",
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

    const text = texts[index % texts.length]

    const staticOuter = {
        flex: 1,
        width: "100%",
        fontSize: "14px",
        color: textColor,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ...randomAnim,
        ...hoverAnim,
    }

    return (
        <animated.div
            style={staticOuter}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div style={{ flex: leftFlex }} />
            <div style={{ padding: "0px 20px 0px 20px" }}>{text}</div>
            <div style={{ flex: rightFlex }} />
        </animated.div>
    )
}

export default Backtext
