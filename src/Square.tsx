import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {AppState, useStoreActions, ContentItem, useStoreState, ContentOwner, freeSpace} from "./store";


type Props = {
  item: ContentItem,
  selected: boolean,
  onClick: () => void;
};

const hover = css`
  &:hover {
     background-color: rgba(174,112,10, .2) 
  }
`;
const SquareContainer = styled.div`
  position: relative;
  width: 20%;
`;

const SquareButton = styled.button<{selected: boolean}>`
  background-color: ${ ({ selected }) => selected ? 'rgba(255,104,4, 10)': 'transparent'};  
  color: ${ ({ selected }) => selected ? 'white': 'black'};
  position: absolute;
  left: 0;
  right:0;
  top: 0;
  bottom: 0;
  width: 100%;
  outline: none;
  ${({ selected }) => !selected && hover}
`;
export const Square: React.FC<Props> = ({ item }) =>  {
  const toggleItem = useStoreActions(actions => actions.toggleItem);
  const selected = useStoreState(state => {
    return state.selectedItems.includes(item.id);
  });

    return (
      <SquareContainer>
        <SquareButton
          disabled={item.id === freeSpace.id}
          onClick={() => toggleItem(item.id)}
          selected={selected}>
          {item.value}
        </SquareButton>
        <Initials>{item.owner === ContentOwner.Bill ? 'BQ' : item.owner === ContentOwner.Don ? 'DF' : ""}</Initials>
      </SquareContainer>
    );
};


const Initials = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  font-size: 36px;
  color: rgba(105,105,105, .15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: -1;
`;
