import ToggleButton from 'react-toggle-button'
 const ToggleBtn = (props) => {
    return(
        <ToggleButton
            inactiveLabel={''}
            activeLabel={''}
            colors={{
                activeThumb: {
                base: 'rgb(250,250,250)',
                },
                inactiveThumb: {
                base: 'rgb(62,130,247)',
                },
                active: {
                base: 'rgb(207,221,245)',
                hover: 'rgb(177, 191, 215)',
                },
                inactive: {
                base: 'rgb(65,66,68)',
                hover: 'rgb(95,96,98)',
                }
            }}
            // trackStyle={styles.trackStyle}
            // thumbStyle={styles.thumbStyle}
            thumbAnimateRange={[-10, 36]}
            // thumbIcon={<ThumbIcon/>}
            defaultValue={true}
            onToggle={() => props.onToggle()}
        />
    )
}
export default ToggleBtn
