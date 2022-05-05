import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import nodemailer from "nodemailer";
import express from "express";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
	const { type, comment, screenshot } = req.body;

	const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
	const nodemailerMailAdapter = new NodemailerMailAdapter();

	const submitFeddbackUseCase = new SubmitFeedbackUseCase(
		prismaFeedbacksRepository,
		nodemailerMailAdapter
	);

	await submitFeddbackUseCase.execute({
		type,
		comment,
		screenshot,
	});

	return res.status(201).send();
});
