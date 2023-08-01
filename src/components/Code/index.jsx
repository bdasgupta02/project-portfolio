import React from "react"

const index = ({ children, style = {} }) => {
    const outer = {
        padding: "14px",
        color: "#FFFFFF",
        ...style,
    }

    return (
        <div style={outer} className="bg-grey">
            <code>{children}</code>
        </div>
    )
}

export default index
