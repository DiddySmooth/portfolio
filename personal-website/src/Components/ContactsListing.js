const ContactListing = (props) => {
    return(
        <div className="contactListing">
            <div className="listingTitleCont">
                <p className="listingTitle">{props.listingTitle}</p>
            </div>
            <div className="listingContentCont">
                <p className="listingContent">{props.listingContent}</p>
            </div>
            
        </div>
    )
}
export default ContactListing