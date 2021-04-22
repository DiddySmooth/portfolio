import Skill from "./Skill"

const SkillsContainer = () => {
    return(
        <div className = "skillsContainer">
            <div>Skills</div>
            <Skill skillName= "JavaScript" />
            <Skill skillName= "HTML" />
            <Skill skillName= "CSS" />
            <Skill skillName= "Node" />
            <Skill skillName= "React" />
            <Skill skillName= "Sql" />
            <Skill skillName= "Java" />
            <Skill skillName= "C#" />
            <Skill skillName= "Python" />

        </div>
        
    )
}
export default SkillsContainer