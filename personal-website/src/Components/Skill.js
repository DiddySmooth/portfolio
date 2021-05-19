const Skill = (props) => {
    return(
        <div className="skillDiv">
            <p className="skillName">{props.skillName}</p>
            <img className="skillPicture" src={props.picture} />
        </div>
    )
}
export default Skill