import React from 'react';

const Card = ({name, email, id}) => {

    return (
        <div className='tc dib br3 pa3 ma3 grow bg-light-green bw2 shadow-5'>
            <img src={`https://robohash.org/${id}?size=200x200`} alt='robats' />
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    )
};


export default Card;
