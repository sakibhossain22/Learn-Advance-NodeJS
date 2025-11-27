const fs = require('fs');
const path = require('path');



const categories = {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg'],
    documents: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
    videos: ['.mp4', '.avi', '.mkv', '.mov', '.wmv'],
    audio: ['.mp3', '.wav', '.flac', '.aac', '.ogg'],
    code: ['.js', '.py', '.java', '.cpp', '.html', '.css'],
    archives: ['.zip', '.rar', '.tar', '.gz', '.7z'],
    spreadsheets: ['.xls', '.xlsx', '.csv'],
    others: [],
};
const testFiles = [
    // Images
    "vacation.jpg",
    "logo.png",
    "banner.jpeg",
    // Documents
    "report.pdf",
    "notes.doc",
    "resume.docx",
    "story.txt",

    // Videos
    "movie.mp4",
    "clip.avi",
    "trailer.mkv",

    // Audio
    "music.mp3",
    "voice.wav",
    "instrument.flac",

    // Code
    "script.js",
    "app.py",
    "program.java",
    // Archives
    "backup.zip",
    "resources.rar",
    "package.tar",

    // Spreadsheets
    "data.csv",
    "report.xlsx",
    "summary.xls",
    // Others
    "unknown.xyz",
    "randomfile.bin",
];

const sourceDir = path.join(__dirname, 'output', 'messy-file')
const organizedDir = path.join(__dirname, 'output', 'organized')

const initializeDirectory = () => {
    if (!fs.existsSync(sourceDir)) {
        fs.mkdirSync(sourceDir)
        testFiles.forEach(file => {
            fs.writeFileSync(path.join(sourceDir, file), `Content of this file is ${file}`)
        })
    }
    console.log('messy File Created');
    if (!fs.existsSync(organizedDir)) {
        fs.mkdirSync(organizedDir, { recursive: true })
    }
    Object.keys(categories).forEach(category => {
        const categoryPath = path.join(organizedDir, category)
        if (!fs.existsSync(categoryPath)) {
            fs.mkdirSync(categoryPath)
        }
    })
}

const getCategory = (filename) => {
    const ext = path.extname(filename).toLowerCase()

    for (const [category, values] of Object.entries(categories)) {

        if (values.includes(ext)) {
            console.log(category);
            return category
        }

    }
    return 'others'
}
const organizedFiles = () => {
    const files = fs.readdirSync(sourceDir)
    if (files.length === 0) {
        console.log('No files to work');
        return
    }

    files.forEach(file => {
        const sourcePath = path.join(sourceDir, file)
        const category = getCategory(file)
        const orgDir = path.join(organizedDir, category)
        const orgPath = path.join(orgDir, file)

        fs.copyFileSync(sourcePath, orgPath)

    })

}

initializeDirectory()
organizedFiles()