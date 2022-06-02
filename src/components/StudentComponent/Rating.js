
export default function Rating({ value, text }) {
    return (
        <div>
            <div className="rating">
                <span>
                    <i
                        className={value >= 1 ? "fa fa-star p-0 m-0 text-success"
                            : value >= 0.5 ? "fa fa-star-o p-0 m-0"
                                : "fas fa-start"}>
                    </i>
                </span>
                <span>
                    <i
                        className={value >= 2 ? "fa fa-star p-0 m-0 text-success"
                            : value >= 1.5 ? "fas fa-star-half-alt"
                                : "fas fa-start"}>
                    </i>
                </span>
                <span>
                    <i
                        className={value >= 3 ? "fa fa-star p-0 m-0 text-success"
                            : value >= 2.5 ? "fas fa-star-half-alt"
                                : "fas fa-start"}>
                    </i>
                </span>
                <span>
                    <i
                        className={value >= 4 ? "fa fa-star p-0 m-0 text-success"
                            : value >= 3.5 ? "fas fa-star-half-alt"
                                : "fas fa-start"}>
                    </i>
                </span>
                <span>
                    <i
                        className={value >= 5 ? "fa fa-star p-0 m-0 text-success"
                            : value >= 4.5 ? "fas fa-star-half-alt"
                                : "fas fa-start"}>
                    </i>
                </span>
            </div>
            <div>
                <span style={{ fontSize: "80%" }}>{text && text} </span>
            </div>
        </div>
    )
}