const fs = require("fs")
const path = require("path")

// Function to search for useEffectEvent in a file
function searchInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    if (content.includes("useEffectEvent")) {
      console.log(`Found useEffectEvent in: ${filePath}`)
    }
  } catch (err) {
    console.error(`Error reading file ${filePath}: ${err}`)
  }
}

// Function to recursively search directories
function searchDirectory(dir) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory() && !filePath.includes("node_modules") && !filePath.includes(".next")) {
      searchDirectory(filePath)
    } else if (
      stat.isFile() &&
      (filePath.endsWith(".js") || filePath.endsWith(".jsx") || filePath.endsWith(".ts") || filePath.endsWith(".tsx"))
    ) {
      searchInFile(filePath)
    }
  })
}

// Start search from the current directory
console.log("Searching for useEffectEvent imports...")
searchDirectory(".")
console.log("Search complete.")
