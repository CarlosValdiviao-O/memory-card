import React, { useState } from "react";

const Card = (props) => {
    const { item, onClick } = props;
  return (
    <button onClick = {() => onClick(item)} className='card'>
      <img src={`${process.env.PUBLIC_URL}/assets/images/${item.id}.png`} ></img>
      <div className="info">
        <img src={`${process.env.PUBLIC_URL}/assets/images/pokeball.jpeg`}></img>
        <p>{item.name}</p>
      </div>
    </button>
  );
}

export default Card;