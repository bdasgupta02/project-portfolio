import React from "react"
import H3Wrapper from "../components/H3Wrapper"
import Code from "../components/Code"
import Footnote from "../components/Footnote"
import Button from "@mui/material/Button"
import GitHubIcon from "@mui/icons-material/GitHub"
import tonicArch from "../assets/tonic-compiler.svg"

const BodyTonic = () => {
    return (
        <>
            <H3Wrapper>Motivation</H3Wrapper>
            <p>
                Competitive programming is perhaps one of the most time
                sensitive and challenging sports out there. But current
                languages are not optimized for competing, due to their
                verbosity and differences in priorities and design.
            </p>

            <H3Wrapper isPara={false}>Requirements</H3Wrapper>
            <p>
                <ul>
                    <li>
                        To be significantly less than popular OOP languages like
                        C++ that are used in competitive programming.
                    </li>
                    <li>
                        To have additional functionality like advanced data
                        structures, algorithms, debugging and dynamic
                        programming.
                    </li>
                    <li>
                        Low abstraction or overhead to keep runtime speed
                        intact.
                    </li>
                </ul>
            </p>

            <H3Wrapper marginTop="40px">Some key design decisions</H3Wrapper>
            <p style={{ marginBottom: "6px" }}>Type inference, C++ pointers</p>
            <Code style={{ marginBottom: "16px" }}>
                i = 10 <br />
                i: int = 10 <br />
                <br />
                ip = {"&i"} // pointer
                <br />
                ip: int* = {"&i"}
                <br />
                <br />
                ir: int{"&"} = i // reference
            </Code>

            <p style={{ marginBottom: "6px" }}>Less verbose loops</p>
            <Code style={{ marginBottom: "6px" }}>
                for i in 0..n:
                <br />
                &nbsp;&nbsp;out array[i]
                <br />
                <br />
                for element in array:
                <br />
                &nbsp;&nbsp;out element
                <br />
                <br />
                for element: string* in array:
                <br />
                &nbsp;&nbsp;out {"&element"}
            </Code>

            <p style={{ marginBottom: "6px" }}>Smart input</p>
            <Code style={{ marginBottom: "16px" }}>
                in a // retrieves input
                <br /> in a: int
                <br /> <br />
                in arr[20] // fills vector with input series
            </Code>

            <p style={{ marginBottom: "6px" }}>Memoization</p>
            <Code style={{ marginBottom: "16px" }}>
                @memoize // memoizes function calls
                <br />
                int fib(n):
                <br />
                &nbsp;&nbsp;// ...body
            </Code>

            <p style={{ marginBottom: "6px" }}>Destructuring</p>
            <Code>a, b = make_pair(1, 2)</Code>

            <H3Wrapper>The compiler</H3Wrapper>
            <p style={{ marginBottom: "24px" }}>
                Since all competitions accept C++, and that this language is a
                superset, it transpiles to C++ and extends its functionality.
                The link below leads to the GitHub project.
            </p>
            <p>
                Due to the time sensitive nature of competitions, the Tonic
                compiler needs to optimize for efficiency. Instead of using
                several passes through the code, and constructing further
                representations including parse trees, the parser passes through
                the code once. All analysis using the symbol table during the
                parse phase. The following diagram explains this.
            </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    marginTop: "24px",
                }}
            >
                <img
                    src={tonicArch}
                    style={{ maxWidth: "600px", width: "100%" }}
                />
            </div>

            <H3Wrapper>Compiler project (in progress)</H3Wrapper>
            <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                sx={{
                    backgroundColor: "#1b1b1b",
                    "&:hover": { backgroundColor: "#0a0a0a" },
                    maxWidth: "200px",
                    fontFamily: "Manrope",
                    textTransform: "none",
                }}
                onClick={() => {
                    window.open("https://github.com/tonic-lang/tonic", "_blank")
                }}
            >
                GitHub Project
            </Button>

            <Footnote withProjects />
        </>
    )
}

export default BodyTonic
