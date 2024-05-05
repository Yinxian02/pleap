const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: 'sk-proj-BS4ycQ1aNLgCFTeTyQVAT3BlbkFJcIcQlkIRbmVCm3qPbOS1'
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();