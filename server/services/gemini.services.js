import { json } from "express"

const Gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent"

export const genrateGeminiResponce = async (prompt) => {

    try {

        const responce = await fetch(`${Gemini_url}?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        })
        if (!responce.ok) {
            const err = await responce.text()
            throw new Error(err)
        }
        const data = await responce.json()

        const text = data.candidates[0].content.parts[0].text

        if (!text) {
            throw new Error("No text in responce")
        }

        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanedText)

    } catch (error) {
    console.log("Gemini API error:", error)
    throw new Error("Failed to generate notes. Please try again later.")
    }

}