import React from "react"
import H3Wrapper from "../components/H3Wrapper"
import Footnote from "../components/Footnote"
import Button from "@mui/material/Button"
import GitHubIcon from "@mui/icons-material/GitHub"
import dbPartition from "../assets/db-partition.svg"
import dbStruct from "../assets/db-struct.svg"
import Code from "../components/Code"

const BodyDatabase = () => {
    return (
        <>
            <H3Wrapper>The challenge</H3Wrapper>
            <p>
                The project was interesting in the way that it transcends
                tracking a value of an item - like normal time-series - rather
                requiring the knowledge of past events at any given point of
                time. This is because order-book data at any queried time needs
                to contain the state of all orders before that period, since
                different quantity-price pairs available previously will be
                available into the future unless they are traded or cancelled.
                This makes it a very fun problem to think about - especially
                given the fact that querying all historical orders before a time
                to derive an order-book is simply not practical.
            </p>

            <H3Wrapper isPara={false}>The functional requirements</H3Wrapper>
            <ul>
                <li>
                    Enabling the fast insertion or batch ingestions of multiple
                    orders.
                </li>
                <li>Querying order-book snapshots based on time.</li>
                <li>Updating or deleting any order.</li>
            </ul>

            <H3Wrapper isPara={false} marginTop="40px">
                The nonfunctional requirements
            </H3Wrapper>
            <ul>
                <li>
                    The database can potentially have large numbers of records,
                    and would need to scale well without sacrificing any speed.
                </li>
                <li>
                    Ingestions of files and order insertions should be fast, as
                    this would hypothetically be a read-heavy storage system.
                </li>
                <li>
                    The underlying data should be tolerant to faults, as a minor
                    corruption somewhere should not compromise an organization's
                    entire repository of order-book data.
                </li>
                <li>
                    Queries should be fast as well, especially since the engine
                    shouldn't manually query all historic state before a queried
                    time to generate a snapshot of the order-book.
                </li>
                <li>
                    Low memory/CPU overhead, especially for file ingestions
                    which can take significant overhead for buffers - especially
                    due to the large expected scale.
                </li>
                <li>
                    Must provide abstraction for the end-developer, as they
                    should see the warehouse as one big bucket to store and pull
                    data from - instead of knowing the underlying complexities.
                </li>
            </ul>

            <H3Wrapper marginTop="40px">Key assumptions</H3Wrapper>
            <ul>
                <li>
                    Historic edits, deletions and insertions in middle of the
                    data would be unlikely, as data from files and trading
                    systems would most likely arrive linearly forward with
                    respect to time.
                </li>
                <li>
                    Write-heavy due to the constant flow of orderbook data, but
                    reads should be fast for data-analysis needs, given the
                    potential scale of data.
                </li>
            </ul>

            <H3Wrapper marginTop="40px">Storage format</H3Wrapper>
            <p>
                To ensure fault-tolerance, scalability, replicability, and
                portability, the underlying data structure is designed to be
                partitioned very easily - and with minimal dependency between
                the partitions. The data is therefore partitioned both by the
                ticker symbol of a financial product, as well as small time
                window (in terms of nanosecond-based epoch from 1 January 1970
                00:00:00). Only a single partitioned chunk is needed to find the
                data for any time within the epoch window. This sort of
                dependency segregation for queries implies that larger amount of
                files do not slow down queries, which is neat.
            </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    marginTop: "24px",
                    marginBottom: "24px",
                }}
            >
                <img
                    src={dbPartition}
                    style={{ maxWidth: "600px", width: "100%" }}
                />
            </div>
            <p>
                Each file stores the order data for a given epoch window
                (default at 10 minute-windows, but can be adjusted to any
                number). Each file will be named by the epoch at which the
                window starts, within a folder named by the symbol ticker name.
                This is the composition of these chunks:
            </p>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    marginTop: "24px",
                    marginBottom: "24px",
                }}
            >
                <img
                    src={dbStruct}
                    style={{ maxWidth: "600px", width: "100%" }}
                />
            </div>
            <p style={{ marginBottom: "24px" }}>
                Consistent with the partitioning system seen above, these files
                will be separately stored and completely independent from each
                other for fast and scalable queries. So querying one file would
                not affect or touch any other file. The files will then be
                stored like the following example:
            </p>
            <Code>
                storage/
                <br />
                &nbsp;&nbsp;TWTR/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{
                    "<--"
                } Symbol <br />
                &nbsp;&nbsp;&nbsp;&nbsp;100.dat {"<--"} Chunk file for an epoch
                window
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;200.dat
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;...
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;IDX.dat {"<--"} AVL Tree index for epoch
                windows
                <br />
                &nbsp;&nbsp;META/
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;100.dat
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;200.dat
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;...
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;IDX.dat
                <br />
            </Code>

            <H3Wrapper>Functionality</H3Wrapper>
            <p style={{ fontWeight: "bold" }}>Insertions</p>
            <ul>
                <li>
                    Insertions can be made individually for each order, or by
                    file ingestion.
                </li>
                <li>
                    As for file ingestions, as stated in the assumptions the
                    data needs to be cleaned and sorted according to epoch, and
                    follow the following format:
                    <Code style={{ marginTop: "8px", marginBottom: "8px" }}>
                        epoch | id | symbol | side(BUY/SELL) |
                        category(NEW/TRADE/CANCEL) | price | quantity
                    </Code>
                </li>
                <li>
                    Ingestions are well-optimized if the orders are being
                    appended on top of temporally previous orders, without any
                    orders already stored for the future.
                </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>Queries</p>
            <ul>
                <li>
                    Supports singular and multiple epoch queries, with custom
                    specified fields if needed (as the prompt requested).
                </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>Updates</p>
            <ul>
                <li>
                    Although not optimised for updates due to the identified
                    characteristics, updates are still supported at a relatively
                    slower speed.
                </li>
            </ul>

            <p style={{ fontWeight: "bold" }}>Deletes</p>
            <ul>
                <li>
                    Deletions can be made with an epoch-id pair for an order.
                    Works very similar to updates, and is therefore relatively
                    sluggish if very old orders are deleted.
                </li>
            </ul>

            <H3Wrapper>GitHub Project</H3Wrapper>
            <p style={{ marginBottom: "6px" }}>
                All source files and documentation is available in the GitHub
                project below.
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
                        "https://github.com/bdasgupta02/order-warehouse",
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

export default BodyDatabase
