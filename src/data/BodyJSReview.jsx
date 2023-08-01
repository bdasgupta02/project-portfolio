import React from "react"
import H3Wrapper from "../components/H3Wrapper"
import Footnote from "../components/Footnote"
import Button from "@mui/material/Button"
import arch from "../assets/jsreview-arch.svg"
import swrf from "../assets/jsreview-swrf.svg"

const BodyJSReview = () => {
    return (
        <>
            <H3Wrapper>Motivation</H3Wrapper>
            <p style={{ marginBottom: "16px" }}>
                The motivation behind this project is rooted in the modern
                challenges and limitations of code reviews, considering the
                ever-growing complexity and scale of modern software engineering
                projects. As the software development landscape evolves, there
                is an increasing demand for an efficient, reliable, and
                automated solution to cope with this growing complexity.
                Automation in this area therefore remains a crucial area in need
                of improvement, as code reviews are still done by manual work in
                the industry.
            </p>
            <p>
                Moreover, the advantages of an ACR solution extend to a wide
                range of beneficiaries, encompassing not only large software
                engineering teams but also students and individual developers.
                For sizable teams working on progressively complex projects,
                implementing an ACR system can significantly decrease the effort
                and manpower required for code reviews, thereby streamlining the
                overall development process.
            </p>

            <H3Wrapper>Objective</H3Wrapper>
            <p style={{ marginBottom: "16px" }}>
                This project therefore aims to design and implement a an ACR
                system that comprehensively automates the review process
                effectively, decreasing the need for manual reviewers. It should
                review most aspects of a code review - namely code quality, code
                smells, bugs and any maintainability risks.
            </p>
            <p style={{ marginBottom: "16px" }}>
                As one of the most dynamic languages with typing and runtime
                behavior, JavaScript is a highly challenging language to analyze
                for vulnerabilities and defects. This is only worsened by the
                “jungle of JavaScript frameworks”, as the primary package
                registry NPM distributes upwards of 1.3 million packages 20 -
                each with slightly different standards, expectations, and
                conventions due to the language's unopinionated nature. This
                project therefore focuses on JavaScript while keeping its
                concepts scalable to other languages.
            </p>
            <p>
                More details on the specific requirements are in the thesis,
                accessible at the end of this page.
            </p>

            <H3Wrapper>Framework design</H3Wrapper>
            <p style={{ marginBottom: "16px" }}>
                The framework preprocesses all incoming code to AST
                representations to retain their structural, relational, and
                semantic aspects for all downstream tasks - since both
                categories above need AST- based extraction of key details like
                blocks, values, and software metrics. Downstream, this AST
                representation will go through the following pattern-based
                analytics, before being passed to the learning-based analytics
                for vulnerabilities and bugs - with extracted functions and
                software metrics from the AST. The final ACR report therefore
                includes a comprehensive review of the code.
            </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <img src={arch} style={{ maxWidth: "600px", width: "100%" }} />
            </div>

            <H3Wrapper>Pattern based analytics</H3Wrapper>
            <p>
                All pattern based analytics are strictly rule-based and analyze
                the different parts of an AST. This stage of the framework takes
                the encoded AST tree, and analyzes the following:
                <ul>
                    <li style={{ marginBottom: "16px" }}>
                        <span style={{ fontWeight: "bold" }}>
                            Closures/blocks:{" "}
                        </span>
                        The AST will be recursively searched to according to
                        closures and code-blocks, to analyse them against the
                        code smell and maintainability risk patterns. Through
                        this, function nodes will also be extracted to be passed
                        further downstream to both the software metric
                        extraction stage, and the bug detection and repair model
                        for analysis.
                    </li>
                    <li style={{ marginBottom: "16px" }}>
                        <span style={{ fontWeight: "bold" }}>
                            Value lifecycle analysis:{" "}
                        </span>
                        Variables, function arguments and class attributes will
                        then be tracked via recursive walks through the AST, to
                        also match them against code smell and maintainability
                        risk patterns.
                    </li>
                    <li>
                        <span style={{ fontWeight: "bold" }}>
                            Software metric extraction:{" "}
                        </span>
                        Extracted functions from the closure/block analysis will
                        be further analysed to get key software metrics - to
                        then be passed downstream to the vulnerable hotspot
                        classifier as feature vectors.
                    </li>
                </ul>
            </p>

            <H3Wrapper marginTop="40px">Vulnerable hotspot detection</H3Wrapper>
            <p>
                To detect vulnerable hotspots, a dataset with vulnerable and
                safe functions were used where each feature vector had software
                complexity and analysis metrics. This therefore became a binary
                classification task for each function in the codebase, extracted
                by the AST. A lot of models were tested for this task, with the
                baseline being a KNN classifier model.
            </p>

            <H3Wrapper>SWRF: Novel model for binary classification</H3Wrapper>
            <p style={{ marginBottom: "16px" }}>
                Demanding higher performance in the earlier vulnerability
                classification model, I explored two new models, with one of
                them outperforming all tested binary classification models. The
                challenge was the small scale of the dataset as well as the
                disbalance of lower positives. Undersampling or SMOTE did not
                yield higher ROC-AUC or F1 scores due to the conjunction of
                these two issues.
            </p>
            <p style={{ marginBottom: "26px" }}>
                A Self-Balancing Weighted Random Forest (SWRF) model was
                created, which aimed to combat these issues by preventing any
                oversampling or undersampling for the entire training data, and
                maximizing the benefits of bootstrapping. Each tree is trained
                on a balanced subset of data, and given a score based on its
                ROC-AUC score when tested on the rest of the data (that it has
                not sampled). This score is then used for a weighted voting
                system, instead of a simple average.
            </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                <img src={swrf} style={{ maxWidth: "700px", width: "100%" }} />
            </div>

            <H3Wrapper>Bug detection and patching</H3Wrapper>
            <p style={{ marginBottom: "16px" }}>
                For the purposes of bug detection, we can first identify two
                major groups of bugs: those that follow specific patterns, and
                those that do not. The first category necessitates a
                pattern-based approach where pieces of code are analyzed through
                their ASTs for pre-defined bug patterns. The second category
                however requires a deeper analysis of complex patterns through
                machine learning.
            </p>
            <p style={{ marginBottom: "16px" }}>
                For the second category, a dataset was created through the
                BugsJS benchmark, and scraped via the GitHub API. The dataset
                included before and after versions of individual JavaScript
                functions - from pull requests in popular repositories after bug
                fixes. This was fed through sequence models and transformers for
                model selection and hyper-parameter tuning.
            </p>
            <p>
                The best model through testing was CodeT5 for ROC-AUC and F1
                scores, for bug detection. This was a pre-trained model built on
                top of the T5 transformer, for transfer learning purposes. Due
                to its sequence to sequence nature, the same instance was also
                trained on the task of fixing the detected bugs. Using prefixes
                "Defect: " and "Refine: ", the model could therefore
                successfully and effectively detect and fix bugs.
            </p>

            <H3Wrapper>JSReview application</H3Wrapper>
            <p>
                As a proof of concept, a frontend application was used to enable
                GitHub repository and pull request scans to aid the code review
                process for developers. More details are available in the thesis
                report.
            </p>

            <H3Wrapper>Thesis report link</H3Wrapper>
            <p style={{ marginBottom: "6px" }}>
                The bottom link contains the complete report with more details.
            </p>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "#1b1b1b",
                    "&:hover": { backgroundColor: "#0a0a0a" },
                    maxWidth: "200px",
                    fontFamily: "Manrope",
                    textTransform: "none",
                }}
                onClick={() => {
                    window.open(
                        "https://drive.google.com/file/d/1QNNBWzqWadKsNKoS_NQRLLm2ifLUvqkJ/view?usp=sharing",
                        "_blank"
                    )
                }}
            >
                Thesis report
            </Button>

            <Footnote withProjects />
        </>
    )
}

export default BodyJSReview
