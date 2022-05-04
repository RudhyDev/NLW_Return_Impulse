import { CloseButton } from "../CloseButton";
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import otherImageUrl from "../../assets/other.svg";
import { useState } from "react";
import { FeedBackTypeStep } from "./Steps/FeedBackTypeStep";
import { FeedBackContentStep } from "./Steps/FeedBackContentStep";
import { FeedBackSuccessStep } from "./Steps/FeedBackSuccessStep";

export const feedBackTypes = {
	BUG: {
		title: "Problema",
		image: {
			source: bugImageUrl,
			alt: "Imagem de um inseto (bug)",
		},
	},
	IDEA: {
		title: "Ideia",
		image: {
			source: ideaImageUrl,
			alt: "Imagem de uma lâmpada",
		},
	},
	OTHER: {
		title: "Outro",
		image: {
			source: otherImageUrl,
			alt: "Imagem de um balão de pensamento",
		},
	},
};

export type FeedBackType = keyof typeof feedBackTypes;

export function WidgetForm() {
	const [feedBackType, setFeedbackType] = useState<FeedBackType | null>(null);
	const [feedbackSent, setFeedbackSent] = useState(false);

	function handleRestartFeedBack() {
		setFeedbackSent(false);
		setFeedbackType(null);
	}

	return (
		<div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
			{feedbackSent ? (
				<FeedBackSuccessStep
					onFeedbackRestartRFequested={handleRestartFeedBack}
				/>
			) : (
				<>
					{!feedBackType ? (
						<FeedBackTypeStep onFeedBackTypeChanged={setFeedbackType} />
					) : (
						<FeedBackContentStep
							feedBackType={feedBackType}
							onFeedBackRestartRequested={handleRestartFeedBack}
							onFeedbackSent={() => setFeedbackSent(true)}
						/>
					)}
				</>
			)}

			<footer className="text-xs text-blue-500">
				Feito com ❤️ por{" "}
				<a
					className="underline underline-offset-2"
					href="https://github.com/RudhyDev"
					target="_blank"
				>
					RudhyDev
				</a>
			</footer>
		</div>
	);
}
