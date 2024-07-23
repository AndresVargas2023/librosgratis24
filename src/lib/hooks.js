import { useDispatch, useSelector, useStore } from 'react-redux';

// Usa estas funciones en lugar de `useDispatch` y `useSelector` directamente
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
export const useAppStore = useStore;
