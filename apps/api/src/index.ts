import express from 'express';
const app = express();
app.use(express.json());
app.get('/health', (_, res) => res.json({ ok: true }));
app.get('/demo', (_, res) => res.json({ message: 'Hello from API' }));
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on ${port}`));
