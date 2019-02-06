import React from 'react'

const ImageLoader = props => {
    const { src, width, height, alt, className } = props
    return (
        <img
            src={src}
            width={width}
            height={height}
            className={className}
            alt={alt}
        />
    )
}

export default ImageLoader