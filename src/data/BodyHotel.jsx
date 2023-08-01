import React from "react"
import H3Wrapper from "../components/H3Wrapper"
import Footnote from "../components/Footnote"
import Button from "@mui/material/Button"
import GitHubIcon from "@mui/icons-material/GitHub"

const BodyHotel = () => {
    return (
        <>
            <H3Wrapper>The problem</H3Wrapper>
            <p>
                As online travel agencies and the ease of booking hotels online
                continue to rise, cancellations have become a common challenge
                for hotels to tackle. While guests may see cancellations as a
                minor inconvenience, they can significantly impact a hotel's
                revenue. Hotel bookings are a key source of income, so when
                reservations are cancelled, the hotel may lose revenue and have
                vacant rooms. Thus, hotels must adapt quickly and optimise their
                resources to address the impact of cancellations on their
                business. This can be a complex process that requires hotels to
                be strategic in how they manage their room inventory. While some
                hotels try to overbook their rooms in anticipation of
                cancellations, this approach can be risky and lead to
                disgruntled customers and negative reviews.
            </p>

            <H3Wrapper>Motivation and insights</H3Wrapper>
            <p style={{ marginBottom: "26px" }}>
                Cancellations are a significant concern that impacts both
                travellers and the hospitality industry, especially hotels.
                Guests may experience the frustration of incurring cancellation
                fees or losing deposits when they need to cancel their
                reservations. By deploying a model that accurately predicts
                cancellations, a more equitable policy can be advocated that
                considers the impact on both guests and hotels. For hotels,
                understanding and predicting cancellations would encourage
                effective resource management. Accurate cancellation predictions
                can improve the efficiency and profitability of hotels,
                benefiting both the industry and the economy as a whole.
            </p>
            <p>
                Therefore, accurately predicting cancellations can be a
                significant advantage for hotels. By having a better
                understanding of when and why guests cancel their reservations,
                hotels can make more informed decisions about their room
                inventory and optimise their operations. In turn, this can help
                hotels maximise their profits and provide better experiences for
                their guests. Additionally, having accurate cancellation
                predictions can raise awareness about the challenges that hotels
                face in the digital age. With the rising number of people
                booking their travel online, hotels need to adapt quickly to
                changing demand patterns and manage their resources effectively.
                A more intelligent set of systems surrounding cancellations
                would aid this trend significantly.
            </p>

            <H3Wrapper>Dataset sourcing</H3Wrapper>
            <p>
                Our data is sourced from the Hotel Booking demand datasets paper
                by Antonio et al. (2019). The dataset contains 119,390 hotel
                bookings records with 32 columns, with each representing some
                metric surrounding a person's booking for a city hotel or a
                resort hotel including information such as when the booking was
                made, length of stay, the number of adults, children, and/or
                babies, and the number of available parking spaces.
            </p>

            <H3Wrapper>Detailed project report</H3Wrapper>
            <p style={{ marginBottom: "6px" }}>
                For a detailed report of the EDA, preprocessing, feature
                engineering, model building and evaluation stages, please read
                the original report in the following link.
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
                        "https://drive.google.com/file/d/1X7YuKdSY5M2S7ujekYMdyY60Rnug75s2/view?usp=sharing",
                        "_blank"
                    )
                }}
            >
                Project report
            </Button>

            <H3Wrapper>GitHub Project</H3Wrapper>
            <p style={{ marginBottom: "6px" }}>
                All source files are available in the GitHub project below.
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
                    window.open(
                        "https://github.com/bdasgupta02/IS4303-predicting-hotel-cancellations",
                        "_blank"
                    )
                }}
            >
                GitHub Project
            </Button>

            <Footnote withProjects />
        </>
    )
}

export default BodyHotel
