import { generateTextResponse } from "./generateText";

// const parseJSON = (input) => {
//     console.log(input);
//     if (typeof input === 'string') {
//         try {
//             return JSON.parse(input);
//         } catch (error) {
//             console.error("Invalid JSON string, attempting to fix:", error);

//             // Replace problematic newline characters
//             const fixedInput = input.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
            
//             const startIndex = fixedInput.indexOf('{');
//             const endIndex = fixedInput.lastIndexOf('}');
//             const json = fixedInput.substring(startIndex, endIndex + 1);

//             try {
//                 return JSON.parse(json);
//             } catch (error) {
//                 console.error("Error parsing JSON:", error);
//                 // throw error;
//             }
//         }
//     } else if (typeof input === 'object' && input !== null) {
//         try {
//             // Convert JS object to JSON string then parse to ensure standard format
//             const jsonString = JSON.stringify(input);
//             return JSON.parse(jsonString);
//         } catch (error) {
//             console.error("Error processing JS object:", error);
//             throw error;
//         }
//     } else {
//         console.log(typeof input);
//         throw new Error("Unsupported input type. Expected a JSON string or a JavaScript object.");
//     }
// };

function parseJSON(response) {
    if (typeof response === 'object') {
        return response;
    }
    try {
        return JSON.parse(response);

        // if (parsedResponse && typeof parsedResponse === 'object') {
        //     const { isCorrect, feedback } = parsedResponse;
        //     if (typeof isCorrect === 'boolean' && typeof feedback === 'string') {
        //         return {
        //             isCorrect: isCorrect,
        //             feedback: feedback
        //         };
        //     } else {
        //         throw new Error('Parsed response does not have expected structure');
        //     }
        // } else {
            // const fixedInput = response.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
            
            // const startIndex = fixedInput.indexOf('{');
            // const endIndex = fixedInput.lastIndexOf('}');
            // const json = fixedInput.substring(startIndex, endIndex + 1);

            // try {
            //     return JSON.parse(json);
            // } catch (error) {
            //     console.error("Error parsing JSON:", error);
            //     // throw error;
            // }
        // }
    } catch (error) {
        // Handle parsing errors
        // const fixedInput = response.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
            
        const startIndex = response.indexOf('{');
        const endIndex = response.lastIndexOf('}');
        const json = response.substring(startIndex, endIndex + 1);
        console.log(json); 

        try {
            return JSON.parse(json);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return JSON.parse({
                "isCorrect": false,
                "feedback": "Error providing feedback. Please try again."
            })
        }
        // console.error('Error parsing AI response:', error.message);
        // return null; // or handle error as appropriate for your application
    }
}



const parseJSONArray = (text) => {
    if (Array.isArray(text)) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (error) {
        console.log("Further JSON processing required:", error);
    }
    
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');
    const jsonArray = text.substring(startIndex, endIndex + 1);
    
    try {
        return JSON.parse(jsonArray);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        throw error;
    }
}

const generateAndParseResponse = async (prompt, accessToken, apiType, maxAttempts = 3) => {
    console.log(`Generating and parsing response for ${apiType}...`)
    let attempts = 0;
    let parsedResponse;

    while (attempts < maxAttempts) {
        try {
            const response = await generateTextResponse(prompt, accessToken, apiType);
            console.log(response);
            parsedResponse = parseJSONArray(response);
            console.log(parsedResponse);
            break;
        } catch (error) {
            attempts++;
            if (attempts >= maxAttempts) {
                throw new Error(`Failed to generate a parsable JSON after ${maxAttempts} attempts.`);
            }
        }
    }
    return parsedResponse;
}

export { parseJSON, parseJSONArray, generateAndParseResponse };