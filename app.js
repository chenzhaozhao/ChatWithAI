import express from 'express';
import { ChatGPTAPI } from 'chatgpt';
import TOKEN from './token.js'
const App = express();
App.get('/', async (req, res) => {
    const { message } = req.query || '';
    const api = new ChatGPTAPI({ sessionToken: TOKEN, markdown: false });
    const response = await api.ensureAuth();
    res.send(response)
})

App.listen(3000, () => {
    console.log('app is running')
})
