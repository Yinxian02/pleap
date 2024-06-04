import { generateTextResponse } from "./generateText";

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

const generateAndParseResponse = async (prompt, accessToken, maxAttempts = 3) => {
    let attempts = 0;
    let parsedResponse;

    while (attempts < maxAttempts) {
        try {
            const response = await generateTextResponse(prompt, accessToken);
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

export { parseJSONArray, generateAndParseResponse };