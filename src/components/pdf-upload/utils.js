const { pdfjsLib } = window;
pdfjsLib.GlobalWorkerOptions.workerSrc =
	'//mozilla.github.io/pdf.js/build/pdf.worker.js';

const Base64Prefix = "data:application/pdf;base64,";

function readBlob(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => resolve(reader.result));
		reader.addEventListener("error", reject);
		reader.readAsDataURL(blob);
	})
}

async function printPDF(pdfData) {
	pdfData = await readBlob(pdfData);

	const data = atob(pdfData.substring(Base64Prefix.length))

	const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
	const pdfPage = await pdfDoc.getPage(1);

	const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
	const canvas = document.createElement('canvas');
	const context = canvas.getContext("2d");

	canvas.height = viewport.height;
	canvas.width = viewport.width;

	const renderContext = {
		canvasContext: context,
		viewport,
	};
	const renderTask = pdfPage.render(renderContext);

	return renderTask.promise.then(() => canvas);

}

async function pdfToImage(pdfData) {
	const scale = 1 / window.devicePixelRatio;

	return new window.fabric.Image(pdfData, {
		id: "renderPDF",
		scaleX: scale,
		scaleY: scale,
	})

}

export {
	readBlob,
	printPDF,
	pdfToImage,
}