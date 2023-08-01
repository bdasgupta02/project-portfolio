import React from "react"

const H3Wrapper = ({ children, isPara = true, marginTop = "56px" }) => {
    return (
        <h3 style={{ marginTop, marginBottom: isPara ? "18px" : "0px" }}>
            {children}
        </h3>
    )
}

export default H3Wrapper
