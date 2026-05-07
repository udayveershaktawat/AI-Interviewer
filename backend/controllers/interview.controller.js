
import fs from "fs"
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs"







export const analyzeResume = async (req,res) => {
    try {
        if(!req.file){
            return res.status(400).json({message:"resume required"})
        }
        const filepath = req.file.path;

        const fileBuffer = await fs.promises.readFile(filepath)
        const uint8Array = new Unint8Array(fileBuffer)

        const pdf = await pdfjsLib.getDocument({data:unint8Array}).promise;

        let resumeText =""
        for(let pageNum =1; pageNum<=pdf.numPages;pageNum++){
            const page = await pdf.getPage(pageNum)
            const content = await page.getTextContent();

            const pageText = content.items.map(item=>item.str).join(" ");
            resumeText += pageText + "\n"
        }
        resumeText = resumeText.replace(/\s+/g," ").trim();

        const messages = [
  {
    role: "system",
    content: `
Extract structured data from resume.

Return strictly JSON:

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
        
    } catch (error) {
        
    }
    
}