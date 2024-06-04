const { OpenAI }= require('OpenAI');

const openai = new OpenAI({
    organization: 'org-HHJ1aCFmDOBTck24wRkgtrxi',
    apiKey: 'sk-proj-O8ytqqcswrZ1EdVcnt7HT3BlbkFJt7jJxqAEMWi3oALdoKLz' }
);

async function main() {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]);
  }
  
main();
  