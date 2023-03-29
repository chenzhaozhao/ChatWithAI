
export default async function (req, res) {
    try {
        const completion = await fetch('https://chatbot.theb.ai/api/chat-process', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: req.body,
        })
        console.log(completion,'uuuu',req)
        res.status(200).json({ result:completion });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: 'An error occurred during your request.',
                }
            });
        }
    }
}
