import { prisma } from "./prisma";
import express from "express";

const app = express();
app.use(express.json());

app.post("/feedbacks", async(req, res) => {
	const { type, comment, screeshot } = req.body;

	const feedback = await prisma.feedback.create({
		data: {
			type,
			comment,
			screeshot,
		},
	});

	return res.status(201).json({data: feedback})
});

const port = 3333;
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
