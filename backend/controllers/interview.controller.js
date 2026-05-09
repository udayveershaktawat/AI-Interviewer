import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.services.js";

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "resume required",
      });
    }

    const filepath = req.file.path;

    // Read PDF
    const fileBuffer = await fs.promises.readFile(filepath);
    const uint8Array = new Uint8Array(fileBuffer);

    const pdf = await pdfjsLib.getDocument({
      data: uint8Array,
    }).promise;

    // Extract text
    let resumeText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      resumeText += pageText + "\n";
    }

    resumeText = resumeText
      .replace(/\s+/g, " ")
      .trim();

    // AI Prompt
    const messages = [
      {
        role: "system",
        content: `
Extract structured data from resume.

Return ONLY valid raw JSON.

Rules:
- Keep experience under 120 words
- Maximum 4 projects
- Maximum 15 skills
- No markdown
- No explanation

Format:

{
  "role": "string",
  "experience": "string",
  "projects": ["project1", "project2"],
  "skills": ["skill1", "skill2"]
}
`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];

    // Ask AI
    const aiResponse = await askAi(messages);

    // Clean AI response
    const cleanedResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("AI RESPONSE:", cleanedResponse);

    // Parse JSON safely
    let parsed;

    try {
      parsed = JSON.parse(cleanedResponse);
    } catch (err) {
      console.log("Invalid AI Response:", cleanedResponse);

      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }

      return res.status(500).json({
        message: "AI returned invalid JSON",
      });
    }

    // Delete uploaded file
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    // Send response
    return res.json({
      role: parsed.role || "",
      experience: parsed.experience || "",
      projects: parsed.projects || [],
      skills: parsed.skills || [],
      resumeText,
    });
  } catch (error) {
    console.error(error);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};