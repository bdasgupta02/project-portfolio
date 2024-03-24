import React from "react"
import H3Wrapper from "../components/H3Wrapper"
import Footnote from "../components/Footnote"
import archi from "../assets/social-media-arch.png"
import Button from "@mui/material/Button"
import GitHubIcon from "@mui/icons-material/GitHub"

const BodySocialMedia = () => {
    return (
        <>
            <H3Wrapper>Overview</H3Wrapper>
            <p style={{ marginBottom: "16px" }}>
                The objective of this project is to develop an automated content
                moderator for text content in social media platforms. This
                proposed system is designed to accurately identify and flag
                content that violates terms of service in various categories
                such as hate speech, cyberbullying, and advertisements, while
                also being capable of distinguishing between human-generated and
                AI-generated content. To achieve this, we will leverage four
                commonly used Natural Language Processing (NLP) algorithms,
                namely NaiveBayes, PassiveAggressive, XGBoost, CNN, LSTM, GRU,
                and Transformers.
            </p>
            <p style={{ marginBottom: "16px" }}>
                For the models, we utilized a self-tagged dataset scrapped from
                Reddit posts, and a high-quality dataset of AI-generated content
                using GPT-3.5 and GPT-4. This combined dataset ensures
                comprehensive training on a variety of real-world posts,
                ensuring accuracy, effectiveness, and applicability across all
                the domains for social media.
            </p>
            <p>
                The system offers two distinct end products: an automated
                content collection and screening service for social-media
                platforms, and a user side plug-in for post/comments check.
                Successful implementation therefore promises huge benefits to
                social media platforms, content creators and users, fostering a
                safe and healthy online environment.
            </p>

            <H3Wrapper>Dataset</H3Wrapper>
            <p style={{ marginBottom: "16px" }}>
                Before scraping social media data, we checked the terms of
                service for content scraping. Reddit is the only major platform
                that tolerates automated web scraping. With high content
                similarity on Reddit and other text-heavy platforms (Twitter,
                Facebook, etc.), we decided to purely use Reddit posts and
                comments for our social media data.
            </p>
            <p style={{ marginBottom: "16px" }}>
                We built a data scraper powered by the “praw” library and Reddit
                API, allowing posts and comments to be scraped from multiple
                subreddits to a structured data format. We used the scraper to
                collect Reddit raw data of 20+ topics from 60+ subreddits, which
                are then tagged manually for all six violations.
            </p>
            <p>
                To add positive labels to certain violations and improve model
                robustness, we manually created a confounding dataset consisting
                of 260 randomly sampled "pure" social media posts, which were
                then paraphrased while keeping the structure for inclusion of
                violations. We also selected and fine-tuned high quality
                external datasets for hate content and advertisements, which are
                two most common violations.
            </p>

            <H3Wrapper>Solution architecture</H3Wrapper>
            <img src={archi} />

            <H3Wrapper isPara={false}>Models explored</H3Wrapper>
            <p>
                <ul>
                    <li style={{ marginBottom: "16px" }}>
                        Baseline models
                        <ul>
                            <li>Multinomial Naive Bayes</li>
                            <li>PassiveAggressive Classifier</li>
                            <li>XGBoost Classifier</li>
                        </ul>
                    </li>
                    <li>
                        Deep learning models
                        <ul>
                            <li>Convolutional Neural Network (CNN)</li>
                            <li>Gated Recurrent Unit</li>
                            <li>Long Short-term Memory</li>
                            <li>Basic Transformer</li>
                            <li>
                                Bidirectional Encoder Representations from
                                Transformers (BERT)
                            </li>
                            <li>RoBERTa</li>
                            <li>hateBERT (3 architectural variants)</li>
                        </ul>
                    </li>
                </ul>
            </p>

            <H3Wrapper marginTop="40px">
                Source files and documentation
            </H3Wrapper>
            <p style={{ marginBottom: "6px" }}>
                All source files and further details are available in the GitHub
                repository below.
            </p>
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
                    window.open("https://github.com/bdasgupta02/is4242-group8", "_blank")
                }}
            >
                GitHub Project
            </Button>

            <Footnote withProjects />
        </>
    )
}

export default BodySocialMedia
