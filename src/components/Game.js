import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getDatabase } from "./database";
//checkpoint
const Game = (props) => {
    const { updateScores } = props; 
    const [ clicked, setClicked] = useState([]);
    const [ notClicked, setNotClicked] = useState(getDatabase());
    const [ all, setAll ] = useState(clicked.concat(notClicked));
    const [ display, setDisplay ] = useState([]);
    let aux = all;
    const [ message, setMessage ] = useState(['', '', false]);

    const onClick = (pick) => {
        if (pick.clicked === false) {
            setNotClicked(notClicked.filter(item => {
                if (item.id !== pick.id) return item;
            }))
            setClicked(clicked.concat({
                name: pick.name,
                id: pick.id,
                clicked: true,
            }))
        }
        else {
            displayMessage(false);
            setClicked([]);
            setNotClicked(getDatabase());
        };
    }

    useEffect(() => {
        updateScores(clicked.length);
        if (clicked.length === all.length) {
            displayMessage(true);
            return;
        }       
        setDisplay([]);
        setAll(clicked.concat(notClicked));
        setTimeout(() => {
            aux = clicked.concat(notClicked);
            setDisplay(fillWithRandom());
        }, 300)
    }, [clicked])

    const fillWithRandom = () => {
        let random = [];
        let isOneNotClicked = false;
        for (let i = 0; i < 12; i++) {
            let ind = Math.floor(Math.random() * aux.length);
            random.push(aux[ind]);
            if (aux[ind].clicked === false) isOneNotClicked = true;
            aux.splice(ind, 1); 
        }
        if (isOneNotClicked === false) random = fillWithRandom();
        return random;
    }

    const displayMessage = (bool) => {
        if (bool === true)
        setMessage(['You beat the game!', 'You got the highest score!', true]);
        else
        setMessage(['Good try!', 'Your score: ' + clicked.length , true]);
    }

    const hideMessage = () => {
        setMessage(['', '', false])
        if (message[0] === 'You beat the game!') {
            setClicked([]);
            setNotClicked(getDatabase());
        }
    }

    return (
        <div>
            <div id="cards">
            {display.map((item) => {
                return <Card key = {item.id+clicked.length} item = {item} onClick = {onClick}/>
            })}
            </div>
            <button className={(message[2] === true) ? '' : 'hide'} id = 'message'
                onClick={hideMessage}>
                <h1>{message[0]}</h1>
                <p>{message[1]}</p>
            </button>
        </div>
    )
}

export default Game