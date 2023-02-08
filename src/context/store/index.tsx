import { createContext, useReducer } from "react";

interface IContextState {
	coords: GeolocationCoordinates | null;
	coffeeStores: CoffeeStores
}

type ReducerAction = {
	payload: GeolocationCoordinates;
	type: "UPDATE_LAT_LONG"
} | {
	payload: CoffeeStores;
	type: "UPDATE_COFFEE_STORES"
}

export const UpdateLatLong = (params: GeolocationCoordinates): ReducerAction => ({
	type: "UPDATE_LAT_LONG",
	payload: params
});

export const UpdateCoffeeStores = (params: CoffeeStores): ReducerAction => ({
	type: "UPDATE_COFFEE_STORES",
	payload: params
});

const initialState: IContextState = { coords: null, coffeeStores: { images: [], places: [] } };

export const StoreContext = createContext<{ state: IContextState; dispatch: React.Dispatch<ReducerAction> }>({
	state: initialState,
	dispatch: () => { }
});

const reducer = (state: IContextState, action: ReducerAction): IContextState => {
	switch (action.type) {
		case "UPDATE_LAT_LONG":
			return { coffeeStores: state.coffeeStores, coords: action.payload };
		case 'UPDATE_COFFEE_STORES':
			return { ...state, coffeeStores: action.payload };
		default:
			throw new Error(`Unhandled reducer type in store context: `, action);
	}
}

const StoreProvider = ({ children }: { children: JSX.Element | JSX.Element[] | undefined }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

export default StoreProvider;
