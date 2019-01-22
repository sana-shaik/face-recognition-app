import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    console.log('FaceRecognition',imageUrl);
    return (
        <div className='center'>
            <div className='absolute mt2'>
            <img src={imageUrl} alt= '' width='500px' heigth='auto' />
            </div>
         </div>
        
    );

}

export default FaceRecognition;