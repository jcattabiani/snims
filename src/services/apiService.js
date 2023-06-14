const apiUrl = 'https://api.openai.com/v1/chat/completions';
const apiKey = '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';

const simulateDialogue = (snail1, snail2, handleDialogue) => {
  const data = {
    messages: [
      { role: 'system', content: `Simulate a brief dialogue between two snails named ${snail1.name} and ${snail2.name}. The dialogue should only contain two sentences per snail. give me the whole dialogue as a single array. don't include who's saying the line within the dialogue.` }
    ],
    model: 'gpt-3.5-turbo',
  };

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      const reply = JSON.parse(data.choices[0].message.content);
      handleDialogue(snail1, snail2, reply);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default { simulateDialogue };
