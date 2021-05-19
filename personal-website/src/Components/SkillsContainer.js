import Skill from "./Skill"

const SkillsContainer = () => {
    return(
        <div className = "skillsContainer">
            <div className="skills3">
                <Skill picture="https://i.imgur.com/WM0RYHZ.png" />
                <Skill picture="https://i.imgur.com/zyUWjed.png" />
                <Skill picture="https://i.imgur.com/3xCA0xU.png" />
            </div>
            <div className="skills2">
                <Skill picture="https://i.imgur.com/mPVVrfh.png" />
                <Skill picture="https://i.imgur.com/IfUuYhb.png" />
            </div>
            <div className="skills3">
                <Skill picture="https://i.imgur.com/IGQhFJm.png" />
                <Skill picture="https://i.imgur.com/FW1bSBb.png" />
                <Skill picture="https://i.imgur.com/fS6qHdR.png" />
            </div>
            <div className="skills2">
                <Skill picture="https://i.imgur.com/Q3AZSQC.png" />
                <Skill picture="https://i.imgur.com/Q3AZSQC.png" />
            </div>
            
            

        </div>
        
    )
}
export default SkillsContainer