import ContactListing from "./ContactsListing"

const AboutMeContact = (props) =>{
    return(
        <div className="aboutMeContact">
            <div>About Me</div>
            <ContactListing listingTitle="Web" listingContent ="GraysonMcClead.com"/>
            <ContactListing listingTitle="Phone" listingContent ="806-407-1830"/>
            <ContactListing listingTitle="Email" listingContent ="elgrayso@gmail.com"/>


        </div>
    ) 
}
export default AboutMeContact