import React from 'react'
import '../css/PhotoUpload.css'

const PhotoUpload = props => {
    const { image, image_url, imgLoad} = props
    return (
        <div className='avatar-upload imgDiv '>
            <div className='avatar-edit'>
                <input type='file' 
                    id='imageUpload' 
                    name='image'
                    value={image}
                    onChange={imgLoad}/>
                <label htmlFor='imageUpload'></label>
            </div>
            <div className='avatar-preview'>
                <div 
                    id='imagePreview' 
                    style={{
                        backgroundImage:`url(${image_url ? image_url : 'http://i.pravatar.cc/500?img=7'})`
                    }}>
                </div> 
            </div>
        </div>
    )
}

export default PhotoUpload