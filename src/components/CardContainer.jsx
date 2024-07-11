import React, { useEffect, useState } from 'react'
import Card from './Card';

function CardContainer() {
    // Lo stato di questo componente conterrà un'array di numeri da 0 a 5, ognuno ripetuto 2 volte
    // Quindi 12 coppie di numeri in una sequenza random
    // Ogni singolo numero di questa sequenza verrà passato ad ogni componente Card
    const [shuffledCards, setShuffledCards] = useState(null);

    // Creo il mazzo e lo mescolo
    const handleShuffleCards = () => {
        let cards = [];
        for (let i = 0; i < 6; i++) {
            cards.push(i);
            cards.push(i);
        }
        let shuffled = [];
        for (let i = 0; i < 12; i++) {
            const randomNumber = Math.floor(Math.random() * cards.length);
            let removedElement = cards.splice(randomNumber, 1);
            shuffled.push(removedElement[0]);
        }
        setShuffledCards(shuffled);
    }

    // Chiamo la funzione di generazione del mazzo quando il componente viene montato
    useEffect(() => {
        handleShuffleCards();
    }, [])

    // Creo lo stato che immagazzina i valori delle carte su cui l'utente clicca (click su carta 1 e click su carta 2)
    const initialState = {
        first: {
            index: null,
            front: null
        },
        second: {
            index: null,
            front: null
        }
    };
    const [cardsCheck, setCardsCheck] = useState(initialState);
    const handleCheckCards = ({ index, front }) => {
        if (cardsCheck.first.index === null) { // Se l'utente clicca la prima volta su una carta
            setCardsCheck(prevState => ({
                ...prevState,
                first: {
                    index,
                    front
                }
            }))
        } else {
            if (index !== cardsCheck.first.index) { // Se il secondo click dell'utente è su una carta diversa dalla prima
                setIsChecking(true);
                setCardsCheck(prevState => ({
                    ...prevState,
                    second: {
                        index,
                        front
                    }
                }))
            } else { // Se il secondo click dell'utente è sulla stessa carta del primo click
                setCardsCheck(initialState)
            }
        }
    }

    // Creo uno stato che controlla se le due carte scoperte sono uguali e, in caso positivo, le immagazina in uno stato
    const [destroyedCards, setDestroyedCards] = useState([]);
    useEffect(() => {
        if (cardsCheck.first.index !== null && cardsCheck.second.index !== null) {
            if (cardsCheck.first.front === cardsCheck.second.front) { // Se le due carte girate sono uguali
                setTimeout(() => {
                    setCardsCheck(initialState);
                    setDestroyedCards(prevState => ([
                        ...prevState, cardsCheck.first.front
                    ]));
                    setIsChecking(false);
                }, 1000)
            } else { // Se le due carte sono diverse
                setTimeout(() => {
                    setCardsCheck(initialState);
                    setIsChecking(false);
                }, 1000)
            }
        }
    }, [cardsCheck])

    // Impedisco all'utente un ulteriore click nell'istante in cui viene effettuato il controllo su due carte appena scoperte
    const [isChecking, setIsChecking] = useState(false);

    // Imposto il rigioca
    const playAgain = () => {
        setDestroyedCards([]);
        handleShuffleCards();
    }

    return (
        <div className='flex flex-col items-center'>

            {/* Inizio gioco */}
            {
                destroyedCards.length < 6 &&
                <h1 className='text-4xl text-white'>Memory Game</h1>
            }
            {
                shuffledCards && destroyedCards.length < 6 &&
                <div className='w-[912px] h-[996px] grid grid-cols-4 gap-4 p-8'>
                    {
                        shuffledCards.map((element, index) => {
                            return <Card key={index} index={index} front={element} handleCheckCards={handleCheckCards} isShow={index === cardsCheck.first.index || index === cardsCheck.second.index ? true : false} destroyedCards={destroyedCards} isChecking={isChecking} />
                        })
                    }
                </div>
            }

            {/* Fine gioco */}
            {
                destroyedCards.length === 6 &&
                <div className='flex flex-col gap-4'>
                    <h2 className='text-3xl text-white'>Complimenti, hai vinto!</h2>
                    <button className='py-2 px-3 border rounded-xl text-white' onClick={playAgain}>Rigioca</button>
                </div>
            }
        </div >
    )
}

export default CardContainer
