import express from "express";

const app = express();

const port = 3333
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

app.get('/users', (req, res)=>{
  return res.send('Hello World');
})
