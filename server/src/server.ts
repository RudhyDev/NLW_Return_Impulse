import { prisma } from "./prisma";
import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "175395f7ddef1a",
		pass: "21d0c6ef2efd44",
	},
});

app.post("/feedbacks", async (req, res) => {
	const { type, comment, screeshot } = req.body;

	const feedback = await prisma.feedback.create({
		data: {
			type,
			comment,
			screeshot,
		},
	});

	await transport.sendMail({
		from: "Feedget <rudhy_nlw_return@feedget.com",
		to: "Rudhy Pereira <rudhydev@gmail.com>",
		subject: "Novo feedback",
		html: [
			`<div style="font-family: sans-serif; font-size: 16px; color: #222">`,
			`<p>Tipo do Feedback: ${type}</p>`,
			`<p>Comentário: ${comment}</p>`,
			`</div>`,
		].join("\n"),
	});

	return res.status(201).json({ data: feedback });
});

const port = 3333;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
