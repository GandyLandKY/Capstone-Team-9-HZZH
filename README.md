# Capstone-Team-9-HZZH
A Simple Site Setup to Generate Poster Image and Project Site for Capstone

# HZZH Poster Builder

## Use
1. `npm install`  
2. Edit JSON in `config/`.  
3. `npm run build`  Outputs `dist/hzzh_poster_48x36_compact.html`.  
4. `npm run render`  Exports the `dist/*.pdf` and `dist/*.png`.  

## Notes
1. To keep compute small, HTML prints at 48×36 inches.  
2. PNG uses 4608×3456 px (96 dpi).  Increase density by changing `deviceScaleFactor` in `scripts/render.js`.  
3. All text remains live.  Fonts are system fonts similar to Office 365 defaults.  
