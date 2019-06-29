# Alestria
A Discord bot with fun, colorful, and aesthetic commands for all to use made during **Discord Hack Week**. 
[Click here for the invite link!](https://discordapp.com/api/oauth2/authorize?client_id=592857636869767201&permissions=34816&scope=bot)

Generate images that look like this:
![Crystallized Aurora](https://raw.githubusercontent.com/The3DSquare/image-storage/master/crystal_aurora.png)
![Triangulated snowy mountain with flowers](https://raw.githubusercontent.com/The3DSquare/image-storage/master/triangle_flowers.png)
by converting images with custom filters in Alestria.

You can also generate fun color palettes like these:
![Beach Palette](https://raw.githubusercontent.com/The3DSquare/image-storage/master/palette%205.png)
![Garden Palette](https://raw.githubusercontent.com/The3DSquare/image-storage/master/palette%202.png)
![Renaissance Fair Palette](https://raw.githubusercontent.com/The3DSquare/image-storage/master/palette%203.png)
![Cool Mint Palette](https://raw.githubusercontent.com/The3DSquare/image-storage/master/palette%204.png)
with our generative palette algorithms.
So why not give Alestria a try?
# Commands
Alestria's prefix is `**`.
## **help `<page>`
`**help` contains all the information you will need to use Alestria. 
- `<pages>` include: `filter`, `view`, `palette`, and `gradient`. 

You can also use `**help` on its own to view all of the pages in Alestria's help command. Many commands have examples on their respective pages.
- Example command: `**help filter`

## **filter `<filterType>` `<resolution>` `<url>`
`**filter` allows you to apply cool filters to images.
- `<filterType>` can be either `triangulate`, `crystallize`, `pointillism`, or `pixelate`. 
- `<resolution>` determines the detail in the filtered image. `<resolution>` can be either `small`, `medium`, `large`, or `extralarge`. 
- `<url>` must be a valid PNG or JPEG image link. Images must be over 128 x 128 pixels in size. Some image URLs are glitchy and don't play nicely, so if an image URL you use doesn't work, try another one!
- Example command: `**filter triangulate small https://raw.githubusercontent.com/The3DSquare/image-storage/master/Aurora.jpg`

## **palette `<count>` `<algorithm>` `<type> (gradient exclusive)`
`**palette` generates color palettes with many different algorithms available to your liking. 
- `<count>` tells Alestria how many colors to put into a generated color palette. `<count>` must be greater than 0 but cannot exceed 50.
- `<algorithm>` decides how your color palette is generated. Algorithms include `pastel`, `tintedpastel`, `neon`, `tone`, `shadowlight`, `harmonic`, `triad`, and `gradient`.
- `<type> (gradient exclusive)` is a special parameter for the `gradient` algorithm only. There are preset gradient palettes as well as a random palette. Gradient types include `oceangem`, `autumn`, `summergarden`, `renaissancefair`, `beach`, `lavenderfield`, `squashpatch`, `mint`, `earth`, and `random`.
- Example command: `**palette 6 gradient renaissancefair`

## **view `<colors>`
`**view` generates a palette of colors whose hex values are given to Alestria.
- `<colors>` is a space-delimited sequence of hex color codes without the `#`
- Example command: `**view 9BCCC1 8E7D51 494C28 A02B3D C69847`

# More Information
- If you have issues with Alestria, join my Discord server and I'll hopefully shortly respond.
- Alestria is coded in Node.js.
- I made this bot in 4 days, so unforseen bugs (especially with the filters) may arise.
- `Config.json` 's token is empty.
- The color palettes were inspired by an earlier bot I made. However, the color palettes that bot had were simply scraped from the web. With this bot, all the colors are algorithmically generated.