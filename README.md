# AI-enabled PLeaP - A Personalised Learning Platform

Project detailed here: https://github.com/Yinxian02/pleap/blob/master/AI-enabled%20Personalised%20Learning%20Platform.pdf

## Description
In this project, we developed a learning platform powered by artificial intelligence to identify the best personalisation strategies for diverse learners. 

New learning objects were automatically generated based on the content provided by lesson creators. The generation of learning objects is categorised into __component-wise content generation__ _(e.g.: text-to-speech, image-to-text, video-to-text)_, which provides different modalities of the same content, and __lesson-wise content generation__ _(e.g.: mcq, glossary, challenges)_ using OpenAI/Gemini-1.5-Pro API, utilising key-phrase extraction, prompt engineering and adherence to the Bloom’s Taxonomy hierarchy. 

Learners and learning objects were modelled using the Felder-Silverman Learning Styles Model. Recommendation algorithms explored were content-based, collaborative, and hybrid filtering. Learning object recommendations were based on predictions made using k-means clustering of explicit ratings of learning objects provided by users, correlated by Pearson correlation.

![Screenshot 2024-11-13 at 6 09 55 PM](https://github.com/user-attachments/assets/d6751996-b5b4-4cf7-8740-900b99ce8d08)
![Screenshot 2024-11-13 at 6 09 38 PM](https://github.com/user-attachments/assets/8250c846-985b-4de4-ab82-cfe50e017baf)
