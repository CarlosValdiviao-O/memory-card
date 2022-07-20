import React, { useState } from "react";
import Card from "./Card";
import { getDatabase } from "./database";

const Game = () => {
    let database = getDatabase();
    const [ clicked, setClicked] = useState([]);
    const [ notClicked, setNotClicked] = useState(database);

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
        }
    }
    return (
        <div>
            <h3>Clicked</h3>
            {clicked.map((item) => {
                return <Card key = {item.id} item = {item} onClick = {onClick}/>
            })}
            <h3>Not Clicked</h3>
            {notClicked.map((item) => {
                return <Card key = {item.id} item = {item} onClick = {onClick}/>
            })}
        </div>
    )
}

export default Game