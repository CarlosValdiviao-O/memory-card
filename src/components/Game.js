import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getDatabase } from "./database";

const Game = () => {
    let database = getDatabase();
    const [ clicked, setClicked] = useState([]);
    const [ notClicked, setNotClicked] = useState(database);
    const [ all, setAll ] = useState(clicked.concat(notClicked));
    const [ display, setDisplay ] = useState([]);
    let aux = all;

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
            setClicked([]);
            setNotClicked(database);
        };
    }

    useEffect(() => {
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

    return (
        <div>
            <h3>{clicked.length}</h3>
            {display.map((item) => {
                return <Card key = {item.id+clicked.length} item = {item} onClick = {onClick}/>
            })}
        </div>
    )
}

export default Game