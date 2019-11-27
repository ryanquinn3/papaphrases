import React from 'react';
import styled from 'styled-components';
import {AppState, ContentGrid, ContentItem, useStoreState} from './store';
import {Square} from "./Square";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
`;

const SquareRowContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: stretch;
  justify-content: center;
`;

const SquareRow: React.FC<{ items: ContentItem[]}> = ({ items }) => {
  const squares =  items.map((item, i) => <Square onClick={() => {}} item={item} selected={false} key={item.value + i}/>)
  return <SquareRowContainer>{squares}</SquareRowContainer>
}

type Props = {
};
export const Board: React.FC<Props> = (props) =>  {
  const grid = useStoreState((s) => s.items);
    return (
      <BoardContainer>
      { grid.map((items, i) => (

        <SquareRow key={i} items={items}/>

      ))}
      </BoardContainer>
    )
};
