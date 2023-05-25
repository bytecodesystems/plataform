const ModuleRenderer = ({
    moduleURL,

}) => {
    return (
        <iframe
            src={moduleURL}
            className="w-100"
            style={{height: 600}}
        >

        </iframe>
    )
}

export default ModuleRenderer