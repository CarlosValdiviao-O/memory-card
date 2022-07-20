import React, { useState } from "react";

const Card = (props) => {
    const { item, onClick } = props;
  return (
    <button onClick = {() => onClick(item)}>
      <p>{item.name}</p>
    </button>
  );
}

export default Card;