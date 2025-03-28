export const LandingCards = ({img, data}) => {
    return (
        <div className="landing-cards">
            <img src={img} alt="card-img" />
            <p>{data}</p>
        </div>
    )
}