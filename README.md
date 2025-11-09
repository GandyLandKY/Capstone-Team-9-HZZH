# Capstone-Team-9-HZZH
A Simple Site Setup to Generate Poster Image and Project Site for Capstone

# HZZH Poster Builder

## Use
0. Make sure you are in cd ~/Capstone-Team-9-HZZH
1. `npm install`  
2. Edit JSON in `config/` if you want new values.  
3. `npm run build`  Outputs `dist/hzzh_poster_48x36_compact.html`.  
4. `npm run render`  Exports the `dist/*.pdf` and `dist/*.png`.  

## Notes
1. To keep compute small, HTML prints at 48×36 inches.  
2. PNG uses 4608×3456 px (96 dpi).  Increase density by changing `deviceScaleFactor` in `scripts/render.js`.  
3. All text remains live.  Fonts are system fonts similar to Office 365 defaults.  



# If on Mac:

## Running the Poster Builder on macOS Using VS Code

### 1. Go to the correct project folder

```bash
cd ~/Capstone-Team-9-HZZH
pwd
ls -la
```

### 2. Run the build script

```bash
npm run build
```

### 3. Render the PDF and PNG

```bash
npm run render
```

### 4. If you get a "Missing script" error, add scripts to `package.json`

```bash
node -e "const fs=require('fs');const f=JSON.parse(fs.readFileSync('package.json','utf8'));
f.scripts=f.scripts||{};
f.scripts.build='node scripts/build.js';
f.scripts.render='node scripts/render.js';
fs.writeFileSync('package.json',JSON.stringify(f,null,2));
console.log('scripts updated');"
```

Then run:

```bash
npm run build
npm run render
```

### 5. If Puppeteer is not installed, install it

```bash
npm i puppeteer
```

### 6. Open the generated outputs

```bash
open dist/hzzh_poster_48x36_compact.html
open dist/hzzh_poster_48x36_compact.pdf
open dist/hzzh_poster_48x36_compact.png
```

### 7. If `scripts/` or `config/` folders are missing, create them

Then re-run steps 2 and 3.

### 8. If the `code` command in VS Code is not found

Open the folder manually:

```bash
open -a "Visual Studio Code" .
```

Or install the shell command:

1. Launch VS Code.
2. Press **Command+Shift+P**.
3. Run **Shell Command: Install 'code' command in PATH**.
   Then you can use:

```bash
code .
```

### 9. If you created another folder (`~/hzzh-poster`) with no `package.json` Its totally your problem and not mine, go figure it out. ;-) 