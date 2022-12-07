import { useCallback, useRef, useState } from 'react';
import { checkIsFunction } from '../utils/utils';

export const useStateRef = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(initialState);

  const dispatch = useCallback((stateToSet: any) => {
    ref.current = checkIsFunction(stateToSet) ? stateToSet(ref.current) : stateToSet;
    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
};
