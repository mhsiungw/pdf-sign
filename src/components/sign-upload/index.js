import React, { useEffect, useRef } from 'react';
import './style.css';

const SignUpload = ({ onUpload }) => {
	const canvasRef = useRef(null);
	let isPainting = false;

	useEffect(() => {
		if (canvasRef.current) {
			canvasRef.ctx = canvasRef.current.getContext('2d');
			canvasRef.ctx.lineWidth = 10;
			canvasRef.ctx.lineCap = 'round';
		}
	}, []);

	function startPainting() {
		isPainting = true;
	}

	function finishPainting() {
		isPainting = false;
		canvasRef.ctx.beginPath();
	}

	function getPaintPosition(e) {
		const canvasSize = canvasRef.current.getBoundingClientRect();

		if (e.type === 'mousemove') {
			return {
				x: e.clientX - canvasSize.left,
				y: e.clientY - canvasSize.top,
			};
		}
	}

	function draw(e) {
		if (!isPainting) return;

		const paintPosition = getPaintPosition(e);

		canvasRef.ctx.lineTo(paintPosition.x, paintPosition.y);
		canvasRef.ctx.stroke();
	}

	function resetCanvas() {
		canvasRef.ctx.clearRect(
			0,
			0,
			canvasRef.current.width,
			canvasRef.current.height
		);
	}

	function saveCanvas() {
		const newImg = canvasRef.current.toDataURL('image/png');
		document.getElementById('image').src = newImg;
		localStorage.setItem('img', newImg);
	}

	function confirmCanvas() {
		if(!localStorage.getItem('img')) return;
		onUpload();
	}

	return (
		<div className='sign-upload'>
			<canvas
				width='400'
				height='400'
				ref={canvasRef}
				onMouseMove={draw}
				onMouseDown={startPainting}
				onMouseUp={finishPainting}
			/>
			<img alt='' width='200' height='200' id='image' />
			<div className='buttons'>
				<button onClick={resetCanvas}>clear</button>
				<button onClick={saveCanvas}>save</button>
				<button onClick={confirmCanvas}>confirm</button>
			</div>
		</div>
	);
};

export default SignUpload;
