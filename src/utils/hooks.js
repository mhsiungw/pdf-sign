import { useRef, useEffect } from "react";

const useCanvas = () => {
	const canvas = useRef(null);
	const ctx = useRef(null);

	useEffect(() => {
		ctx.current = canvas.current.getContext("2d");
	}, [])

	const getCanvas = () => {
		return {
			canvas: canvas.current,
			ctx: ctx.current,
		}
	}

	return [canvas, getCanvas];
}

export {
	useCanvas,
};