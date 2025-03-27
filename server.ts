// server.js
import fs from 'fs';
import https from 'https';
import express, { Request, Response } from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
	key: fs.readFileSync('./localhost+2-key.pem'),
	cert: fs.readFileSync('./localhost+2.pem'),
};

app.prepare().then(() => {
	const server = express();

	server.all('*', (req: Request, res: Response) => {
		return handle(req, res);
	});

	https.createServer(httpsOptions, server).listen(3000, () => {
		console.log('> Server started on https://localhost:3000');
	});
});
