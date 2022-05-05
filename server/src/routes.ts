import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import nodemailer from "nodemailer";
import express from "express";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "175395f7ddef1a",
		pass: "21d0c6ef2efd44",
	},
});

routes.post("/feedbacks", async (req, res) => {
	const { type, comment, screenshot } = req.body;
  
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
	const submitFeddbackUseCase = new SubmitFeedbackUseCase(
		prismaFeedbacksRepository
	); 

  await submitFeddbackUseCase.execute({
    type,
    comment,
    screenshot
  })

	// await transport.sendMail({
	// 	from: "Feedget <rudhy_nlw_return@feedget.com",
	// 	to: "Rudhy Pereira <rudhydev@gmail.com>",
	// 	subject: "Novo feedback",
	// 	html: [
	// 		`<div style="font-family: sans-serif; font-size: 16px; color: #222">`,
	// 		`<p>Tipo do Feedback: ${type}</p>`,
	// 		`<p>Comentário: ${comment}</p>`,
	// 		`</div>`,
	// 	].join("\n"),
	// });

	return res.status(201).send()
});
