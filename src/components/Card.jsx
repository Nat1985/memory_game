import React, { useEffect, useState } from 'react'
import { cardImages } from '../data/cardImages';
import Back from '../static/images/back.png';

function Card({ index, front, handleCheckCards, isShow, destroyedCards, isChecking }) {
    // Il componente Card riceve il valore di front e lo setta ricevendo l'immagine da mostrare dall'array cardImages
    const [image, setImage] = useState(null);
    useEffect(() => {
        if (front, cardImages) {
            setImage(cardImages[front])
        }
    }, [front, cardImages])

    const handleClick = () => {
        if (!isChecking) {
            handleCheckCards({ index, front });
        }
    }

    return (
        <div>
            {
                !destroyedCards.includes(front) &&
                <div className={`w-[200px] h-[300px] transform transition-transform duration-300 ease-in-out cursor-pointer ${!isChecking && 'hover:scale-105'} ${isShow && 'scale-105'}`} onClick={handleClick}>
                    <img src={isShow ? image : Back} />
                </div>
            }
        </div>

    )
}

export default Card
