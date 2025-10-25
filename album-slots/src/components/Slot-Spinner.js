function SlotSpinner(props) {

    return (
        <div className="spinner">
            {props.url ?
            <img src={props.url} className="spinner-image" alt=""/>
            :<div></div>}
        </div>
    )
}

export default SlotSpinner;