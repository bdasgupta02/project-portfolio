import React from "react"
import { useNavigate } from "react-router-dom"

const Footnote = ({ withProjects = false }) => {
    const navigate = useNavigate()

    const style = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    const outer = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        marginTop: "80px",
        marginBottom: "16px",
    }

    return (
        <div style={outer}>
            {withProjects && (
                <p
                    style={{
                        ...style,
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/")}
                    className="text-grey"
                >
                    See other projects
                </p>
            )}
            {withProjects && <div style={{ flex: 1 }} />}
            <p className="text-accent" style={style}>
                Please contact me at bdasgupta02@gmail.com
            </p>
            {!withProjects && <div style={{ flex: 1 }} />}
            {!withProjects && (
                <p
                    style={{
                        ...style,
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        window.open("https://github.com/bdasgupta02", "_blank")
                    }}
                    className="text-grey"
                >
                    GitHub: bdasgupta02
                </p>
            )}
        </div>
    )
}

export default Footnote
