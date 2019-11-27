import {createStore, persist, action, Action, createTypedHooks} from "easy-peasy";

export enum ContentOwner {
  Bill = 'BQ',
  Don = 'Don',
  Either = 'Either'
}

export type ContentItem = {
  id: string;
  value: string;
  owner: ContentOwner;
}
export type ContentGrid = ContentItem[][];
export const freeSpace = {id: "17", value: "Free Space", owner: ContentOwner.Either};
export const content: ContentItem[] = [
  {id: "0", value: "'Exactly, exactly'", owner: ContentOwner.Don},
  {id: "1", value: "'That's the ticket'", owner: ContentOwner.Don},
  {id: "2", value: "Wipes his eyes from crying", owner: ContentOwner.Don},
  {id: "3", value: "Uses a touchscreen to show pictures", owner: ContentOwner.Don},
  {id: "4", value: "Whips out a tripod", owner: ContentOwner.Don},
  {id: "5", value: "'So I've been thinking about getting a...'", owner: ContentOwner.Don},
  {id: "6", value: "Mentions the health of the lake", owner: ContentOwner.Don},
  {id: "7", value: "'Work it'", owner: ContentOwner.Bill},
  {id: "8", value: "'Get it girl'", owner: ContentOwner.Bill},
  {id: "9", value: "'Let’s blow this clam bake'", owner: ContentOwner.Bill},
  {id: "10", value: "'Yeah baby'", owner: ContentOwner.Bill},
  {id: "25", value: "'So do you eat fish / eggs?'", owner: ContentOwner.Bill},
  {id: "11", value: "Max / rats story", owner: ContentOwner.Bill},
  {id: "12", value: "'OMG'", owner: ContentOwner.Bill},
  {id: "13", value: "'Need a cup of javaaa'", owner: ContentOwner.Bill},
  {id: "14", value: "'Crisp(y)'", owner: ContentOwner.Bill},
  {id: "15", value: "'biscuit'", owner: ContentOwner.Bill},
  {id: "16", value: "Makes any dad joke", owner: ContentOwner.Either},
  freeSpace,
  {id: "18", value: "'Let's rock and roll'", owner: ContentOwner.Bill},
  {id: "19", value: "'So that's interesting...'", owner: ContentOwner.Don},
  {id: "20", value: "Mentions drugs", owner: ContentOwner.Bill},
  {id: "21", value: "Brings up Mask & Whig", owner: ContentOwner.Don},
  {id: "22", value: "'Just saying'", owner: ContentOwner.Don},
  {id: "23", value: "Shows up late", owner: ContentOwner.Bill},
];


const shuffle = <T>(items: T[]) => {
  for (let i = 0; i < items.length; i++) {
    const j = Math.floor(Math.random() * i)
    const temp = items[i]
    items[i] = items[j]
    items[j] = temp
  }
};

const findFreeSpace = (grid:ContentGrid): [number, number] => {
  for (let r = 0; r < grid.length; r++) {
    for(let c = 0; c < grid[0].length; c++) {
      if(grid[r][c] === freeSpace) {
        return [r,c];
      }
    }
  }
  throw new Error('wtf');
}

const getContentGrid = (): ContentGrid => {
  shuffle(content);
  const squares =  content.reduce<ContentGrid>((accum, item, index) => {
    if (accum[0].length < 5) {
      accum[0].push(item);
    }
    if (accum[0].length === 5 && index !== content.length - 1) {
      accum.unshift([]);
    }
    return accum;
  }, [[]]);
  const middle = squares[2][2];
  const [r,c] = findFreeSpace(squares);

  squares[2][2] = squares[r][c];
  squares[r][c] = middle;
  return squares;
};
export type AppState = {
  items: ContentGrid;
  selectedItems: string[];
  toggleItem: Action<AppState, string>
};
const { useStoreActions, useStoreState } = createTypedHooks<AppState>();
export { useStoreActions, useStoreState }
export const store = createStore(persist({

  items: getContentGrid(),
  selectedItems: [freeSpace.id],
  toggleItem: action<AppState>((state, id) => {
    if (state.selectedItems.includes(id)) {
      return {
        ...state,
        selectedItems: state.selectedItems.filter((i) => i !== id),
      }
    }
    return {
      ...state,
      selectedItems: [...state.selectedItems, id],
    }
  })

}));
