const FilledButton = (
    {
        text, padding, background, color,
        cursor, border, borderRadius, fontFamily,
        fontSize, fontWeight, onclick, width,
    }
) => {
    return (
        <div onClick={onclick}>
            <button style={
                {
                    padding: padding, background:background, color: color,
                    cursor:cursor, border:border, borderRadius:borderRadius,
                    fontFamily: fontFamily, fontSize:fontSize, fontWeight:fontWeight,
                    width: width,
                }
            } >
                {text}
            </button>
        </div>
    )
}

export default FilledButton