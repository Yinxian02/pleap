require('dotenv').config();

const { OpenAI } = require('openai');

const openai = new OpenAI({
  organization: 'org-HHJ1aCFmDOBTck24wRkgtrxi',
  apiKey: '',
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    // response_format: { type: "json_object" },
  });
  console.log(completion);

  console.log(completion.choices[0].message.content);
}

main();