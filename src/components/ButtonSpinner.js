import React from 'react'
import { Button } from '@material-ui/core'

const ButtonSpinner = props => {
    const { name, className, isspinning, disabled, color, variant, fullWidth, onClick} = props
    return (
        <div>
            {/* <button className={className} disabled={disabled}>
                {name} { isspinning && <i className="fa fa-circle-o-notch fa-spin"></i> }
            </button> */}
            <Button
                type='submit'
                fullWidth={fullWidth}
                variant={variant}
                color={color}
                className={className}
                disabled={disabled}
                onClick={onClick}
            >
            { isspinning === true && <i className="fa fa-circle-o-notch fa-spin"></i> } { name } 
            </Button>
        </div>
    )
}

export default ButtonSpinner;