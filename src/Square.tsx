import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {AppState, useStoreActions, ContentItem, useStoreState, ContentOwner, freeSpace} from "./store";


type Props = {
  item: ContentItem,
  selected: boolean,
  onClick: () => void;
};
const SquareContainer = styled.div`
  position: relative;
  width: 20%;
`;

enum Color {
  Green = 'rgba(179, 210, 141, .5)',
  OffWhite = 'rgba(235, 230, 202, .5)',
  Crayola = 'rgba(225, 196, 154, .5)',
  Champagne = 'rgba(238, 215, 168, .5)',
  Gold = 'rgba(235, 184, 145, .5)'
}
const SquareButton = styled.button<{selected: boolean, color?: Color }>`
  background-color: ${ ({ color }) => color };  
  position: absolute;
  left: 0;
  right:0;
  top: 0;
  bottom: 0;
  width: 100%;
  outline: none;
 
`;
export const Square: React.FC<Props> = ({ item }) =>  {
  const toggleItem = useStoreActions(actions => actions.toggleItem);
  const selected = useStoreState(state => {
    return state.selectedItems.includes(item.id);
  });
  const color = getColor(item, selected);
    return (
      <SquareContainer>
        <SquareButton
color={color}          disabled={item.id === freeSpace.id}
          onClick={() => toggleItem(item.id)}
          selected={selected}>
          {item.value}
        </SquareButton>
        { !selected && <Initials>{item.owner === ContentOwner.Bill ? 'BQ' : item.owner === ContentOwner.Don ? 'DF' : ""}</Initials>}
      </SquareContainer>
    );
};

const getColor = (item: ContentItem, selected: boolean): Color => {
  if(!selected) {
    return Color.OffWhite;
  }
  if(item.id === freeSpace.id) {
    return Color.Green;
  }
  switch(item.owner) {
    case ContentOwner.Bill: return Color.Champagne
    case ContentOwner.Don: return Color.Gold
    default: return Color.Crayola
  }

}


const Initials = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  font-size: 36px;
  color: rgba(105,105,105, .45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: -1;
`;
