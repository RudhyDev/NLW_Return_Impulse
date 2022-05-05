import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

describe("Submit feedback", () => {
	it("should be able to submit a feedback", async () => {
		const submitFeedback = new SubmitFeedbackUseCase(
			{ create: async () => {} },
			{ sendMail: async () => {} }
		);

		await expect(
			submitFeedback.execute({
				type: "BUG",
				comment: "Exemple comment",
				screenshot: "data:image/png;base64ae454324sd3ad4ad",
			})
		).resolves.not.toThrow();
	});
});
