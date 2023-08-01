import React from "react"
import { animated, useSpring } from "@react-spring/web"

const Tab = ({ e, idx, setIdx, activeIdx }) => {
    const base = {
        cursor: "pointer",
        padding: "4px 8px 4px 8px",
    }

    const inactive = {
        fontWeight: 400,
        backgroundColor: '#FFFFFF'
    }

    const active = {
        fontWeight: 800,
        backgroundColor: '#EFEDED'
    }

    const anim = useSpring(idx === activeIdx ? active : inactive)

    return (
        <animated.p style={{ ...base, ...anim }} onClick={() => setIdx(idx)}>
            {e}
        </animated.p>
    )
}

const Tabs = ({ tabs, setIdx, idx, style }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: "12px",
                ...style,
            }}
            className="text-grey"
        >
            {tabs.map((e, i) => (
                <Tab e={e} idx={i} activeIdx={idx} setIdx={setIdx} />
            ))}
        </div>
    )
}

export default Tabs
