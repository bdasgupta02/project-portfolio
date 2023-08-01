import React from "react"
import BodyTonic from "./BodyTonic"
import BodySocialMedia from "./BodySocialMedia"
import BodyJSReview from "./BodyJSReview"
import BodyDatabase from "./BodyDatabase"
import BodyHotel from "./BodyHotel"

const data = [
    {
        title: "Automatic Code Review Framework",
        desc: "Peer code reviews are a crucial stage in any software engineering project, where incoming source code is manually analyzed for defects and adherence to best practices to ensure the highest quality of the entire project. However, this manual process is often time and resource-intensive, as well as error-prone and inconsistent. To address these challenges, this project proposes and implements a novel automatic code review framework that reduces human effort while enhancing the quality of the review process. This project was my final-year thesis in the National University of Singapore.",
        year: "2023",
        priTag: "Python",
        secTags: ["Thesis", "Machine Learning"],
        body: <BodyJSReview />,
        path: "automatic-code-review",
    },
    {
        title: "Database Engine for Orderbooks",
        desc: "This is a core storage engine for a large scale data warehouse for time-series order-book data for limit orders and trades. Built to support efficient retrieval (for instance, for research processes) and large-scale data storage, this engine is designed to provide order-book snapshot data at a queried time relatively fast.",
        year: "2022",
        priTag: "C++",
        secTags: ["Optimization", "Software Engineering"],
        body: <BodyDatabase />,
        path: "database-engine",
    },
    {
        title: "Social Media Moderation with ML",
        desc: "Automatic moderation for text in social media by detecting terms of service violation and AI content usage through state-of-the-art machine-learning techniques.",
        year: "2023",
        priTag: "Python",
        secTags: ["Streamlit", "Machine Learning"],
        body: <BodySocialMedia />,
        path: "social-media-moderation",
    },
    {
        title: "Tonic Programming Language",
        desc: "A superset language of C++ designed specifically for fast-paced competitive programming. Tonic makes competing much faster to save those precious seconds, without sacrificing runtime speed. Currently in early stages of development.",
        year: "2023",
        priTag: "C++",
        secTags: ["Cmake", "Software Engineering"],
        body: <BodyTonic />,
        path: "tonic-programming-language",
    },
    {
        title: "Predicting Hotel Cancellations",
        desc: "A comprehensive project of predicting hotel cancellations through machine learning. This project was a part of my IS4303: IT-mediated financial solutions and platforms module at the National University of Singapore",
        year: "2023",
        priTag: "Python",
        secTags: ["Research", "Machine Learning"],
        body: <BodyHotel />,
        path: "predicting-hotel-cancellations",
    },
    // {
    //     title: "Novel ML Model Experiments",
    //     desc: "",
    //     year: "Ongoing",
    //     priTag: "Python",
    //     secTags: [],
    //     body: <BodyTonic />,
    //     path: "novel-models",
    // },
    // {
    //     title: "Software Experiments",
    //     desc: "",
    //     year: "Ongoing",
    //     priTag: "Others",
    //     secTags: [],
    //     body: <BodyTonic />,
    //     path: "software-experiments",
    // },
]

export default data
