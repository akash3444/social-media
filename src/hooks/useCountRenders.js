import { useRef } from "react";
export const useCountRenders = (str = "") => {
	let renderCounter = useRef(0);

	console.log(str, renderCounter.current++);
};
