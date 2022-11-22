import { useState, useEffect } from 'react';
import SignUpload from './components/sign-upload';
import PdfUpload from './components/pdf-upload';
import { StepEnums } from './enums';

const { UPLOAD_SIGN, UPLOAD_PDF } = StepEnums;

function App() {
	const [step, setStep] = useState(UPLOAD_SIGN);

	useEffect(() => {
		localStorage.removeItem('img');
	},[]);

	const _renderComponents = () => {
		if (step === UPLOAD_SIGN) {
			return <SignUpload onUpload={() => setStep(UPLOAD_PDF)}/>;
		}

		if (step === UPLOAD_PDF) {
			return <PdfUpload/>;
		}
	};

	return <div>{_renderComponents()}</div>;
}

export default App;
