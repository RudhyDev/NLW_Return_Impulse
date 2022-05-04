import html2canvas from "html2canvas";
import { Camera } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./Loading";

export function ScreenShotButton() {
	const [isTakingScreenShot, setIsTakingScreenShot] = useState(true);

	async function handleTakeScreenShot() {
		setIsTakingScreenShot(true);
		const canvas = await html2canvas(document.querySelector("html")!);
		const base64Image = canvas.toDataURL("image/png");
		
		setIsTakingScreenShot(false);
	}

	return (
		<button
			type="button"
			onClick={handleTakeScreenShot}
			className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors"
		>
			{isTakingScreenShot ? 
				<Loading />
			: 
				<Camera weight="bold" className="w-4 h-4" />
			}
		</button>
	);
}
