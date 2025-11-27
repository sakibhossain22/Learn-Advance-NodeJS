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

const sourceDir = path.join(__dirname, 'output', 'messyfiles')
const organizedDir = path.join(__dirname, 'output', 'organizedfiles')

const initializeDirectory = () => {
    if (!fs.existsSync(sourceDir)) {
        fs.mkdirSync(sourceDir)
    }
    testFiles.forEach(file => {
        const filePath = path.join(sourceDir, file)
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, `the content of ${file}`)
        }
    })

    if (!fs.existsSync(organizedDir)) {
        fs.mkdirSync(organizedDir)
    }
    Object.keys(categories).forEach(category => {
        const organizedCategoryDir = path.join(organizedDir,category)
        if(!fs.existsSync(organizedCategoryDir)) {
            fs.mkdirSync(path.join(organizedDir, category))
        }
    })
}
const getCategory = (filename) => {
    const ext = path.extname(filename).toLowerCase()
    for (const [category, values] of Object.entries(categories)) {
        if (values.includes(ext)) {
            return category
        }
    }
    return 'others'
}
const organizedFiles = () => {
    const files = fs.readdirSync(sourceDir)
    if (files.length === 0) {
        return
    }
    files.forEach(file => {
        const filePath = path.join(sourceDir, file)
        const category = getCategory(file)
        const orgDir = path.join(organizedDir, category)
        const orgPath = path.join(orgDir, file )

        fs.copyFileSync(filePath, orgPath)
    })
}
initializeDirectory()
organizedFiles()