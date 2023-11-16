import { createContext, useReducer } from 'react';
import rootReducer from '../reducers/rootReducer';

const initialState = {
  notifications: { acknowledgementMessage: null, errorMessage: null },
  user: null,
};

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(rootReducer, initialState);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
