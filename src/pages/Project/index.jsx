import { Container } from "@mui/material"
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import data from "../../data/projects"
import Background from "./Background"

const Tag = ({ children, style = {} }) => {
    return (
        <div
            style={{
                marginTop: "14px",
                padding: "2px 8px 2px 8px",
                backgroundColor: "white",
                ...style,
            }}
            className="text-grey"
        >
            <h3>{children}</h3>
        </div>
    )
}

// shift to projects
const Project = () => {
    const { pid } = useParams()
    const project = data.find((item) => item.path === pid)

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
        <div>
            <div
                className="bg-grey"
                style={{
                    position: "relative",
                    overflow: "hidden",
                    height: "350px",
                }}
            >
                <Background />
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex: 10,
                        transform: `translateY(-${parallaxOffset}px)`,
                        pointerEvents: "none",
                    }}
                >
                    <Container
                        maxWidth="md"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <div style={{ flex: 1 }} />
                        <h1>{project.title}</h1>
                        <h3>{project.year}</h3>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "14px",
                            }}
                        >
                            <Tag>{project.priTag}</Tag>
                            {project.secTags.map((e) => (
                                <Tag>{e}</Tag>
                            ))}
                        </div>
                        <div style={{ height: "24px" }} />
                    </Container>
                </div>
            </div>
            <Container
                maxWidth="md"
                className="text-grey"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "68px",
                }}
            >
                <p>{project.desc}</p>
                {project.body}
            </Container>
        </div>
    )
}

export default Project
