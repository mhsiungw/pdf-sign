import { useEffect, useRef } from 'react';
import { printPDF, pdfToImage } from './utils';
import './style.css';

const PdfUpload = () => {
	const inputRef = useRef(null);
	const fabricRef = useRef(null);

	useEffect(() => {
		if (fabricRef.current) return;
		fabricRef.current = new window.fabric.Canvas('canvas');
		fabricRef.current.requestRenderAll();
	}, []);

	const _handleInputchange = async (e) => {
		const pdfData = await printPDF(e.target.files[0]);
		const pdfImage = await pdfToImage(pdfData);

		fabricRef.current.setWidth(pdfImage.width / window.devicePixelRatio);
		fabricRef.current.setHeight(pdfImage.height / window.devicePixelRatio);

		fabricRef.current.setBackgroundImage(
			pdfImage,
			fabricRef.current.renderAll.bind(fabricRef.current)
		);
	};

	const _handleImgClick = (e) => {
		window.fabric.Image.fromURL(e.target.src, (image) => {
			image.top = 0;
			image.scaleX = 0.5;
			image.scaleY = 0.5;
			fabricRef.current.add(image);
		});
	};

	const _handleDownload = () => {
		const pdf = new window.jsPDF();

		const image = fabricRef.current.toDataURL("image/png");

		const width = pdf.internal.pageSize.width;
		const height = pdf.internal.pageSize.height;
		pdf.addImage(image, "png", 0, 0, width, height);

		pdf.save("download.pdf");
	};

	return (
		<div className="pdf-upload">
			<div>
				<button onClick={_handleDownload}>download</button>
				<input
					ref={inputRef}
					onChange={(e) => _handleInputchange(e)}
					type='file'
					accept='application/pdf'
					placeholder='選擇PDF檔案'
				/>
				<canvas id='canvas' />
			</div>
			<img
				src={localStorage.getItem('img')}
				onClick={_handleImgClick}
				alt=''
				width="250"
				height="100"
			/>
		</div>
	);
};

export default PdfUpload;
