import React from "react"
import { FullScreen } from "../../components/FullScreen"
import Background from "./Background"
import Foreground from "./Foreground"
import Browser from "./Browser"

const Cover = () => {
    return (
        <div style={{ width: "100%" }}>
            <FullScreen style={{ display: "flex", overflow: "hidden" }}>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                        overflow: "hidden",
                    }}
                    className="bg-grey"
                >
                    <Background />
                    <Foreground />
                </div>
            </FullScreen>

            <Browser />
        </div>
    )
}

export default Cover
