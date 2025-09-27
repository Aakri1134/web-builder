export const fonts = [
  "Google Sans Code",
  "Sansation",
  "Roboto Flex",
  "Merriweather",
  "Noto Serif",
  "Shizuru",
  "Chewy",
  "Chicle",
  "Lakki Reddy",
  "Imperial Script",
  "Luxurious Script",
  "Puppies Play",
  "Bonheur Royale",
  "Pacifico",
  "Sour Gummy",
  "Nanum Pen Script",
  "Grenze Gotisch",
  "Texturina",
  "Sancreek",
  "Rye",
  "UnifrakturMaguntia",
  "Audiowide",
  "Unica One",
  "Atomic Age",
  "Tulpen One",
  "Metal Mania",
  "Caveat Brush",
  "Iceberg",
  "Press Start 2P",
  "Times New Roman"
]as const
export type FontName = typeof fonts[number]

export const fontImports : Record<FontName, string> = {
  "Google Sans Code": `https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap`,
  "Sansation": `https://fonts.googleapis.com/css2?family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap`,
  "Roboto Flex": `https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap`,
  "Merriweather": `https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap`,
  "Noto Serif": `https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap`,
  "Shizuru": `https://fonts.googleapis.com/css2?family=Shizuru&display=swap`,
  "Chewy": `https://fonts.googleapis.com/css2?family=Chewy&family=Shizuru&display=swap`,
  "Chicle": `https://fonts.googleapis.com/css2?family=Chicle&display=swap`,
  "Lakki Reddy": `https://fonts.googleapis.com/css2?family=Lakki+Reddy&display=swap`,
  "Imperial Script": `https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap`,
  "Luxurious Script": `https://fonts.googleapis.com/css2?family=Luxurious+Script&display=swap`,
  "Puppies Play": `https://fonts.googleapis.com/css2?family=Puppies+Play&display=swap`,
  "Bonheur Royale": `https://fonts.googleapis.com/css2?family=Bonheur+Royale&display=swap`,
  "Pacifico": `https://fonts.googleapis.com/css2?family=Pacifico&display=swap`,
  "Sour Gummy": `https://fonts.googleapis.com/css2?family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap`,
  "Nanum Pen Script": `https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap`,
  "Grenze Gotisch": `https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@100..900&display=swap`,
  "Texturina": `https://fonts.googleapis.com/css2?family=Texturina:ital,opsz,wght@0,12..72,100..900;1,12..72,100..900&display=swap`,
  "Sancreek": `https://fonts.googleapis.com/css2?family=Sancreek&display=swap`,
  Rye: `https://fonts.googleapis.com/css2?family=Rye&display=swap`,
  UnifrakturMaguntia: `https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap`,
  Audiowide: `https://fonts.googleapis.com/css2?family=Audiowide&display=swap`,
  "Unica One": `https://fonts.googleapis.com/css2?family=Unica+One&display=swap`,
  "Atomic Age": `https://fonts.googleapis.com/css2?family=Atomic+Age&display=swap`,
  "Tulpen One": `https://fonts.googleapis.com/css2?family=Tulpen+One&display=swap`,
  "Metal Mania": `https://fonts.googleapis.com/css2?family=Metal+Mania&display=swap`,
  "Caveat Brush": `https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap`,
  Iceberg: `https://fonts.googleapis.com/css2?family=Iceberg&display=swap`,
  "Press Start 2P": `https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap`,
  "Times New Roman" : ``
}

export const fontFamily : Record<FontName, string>  = {
  "Google Sans Code": `"Google Sans Code", monospace`,
  "Sansation": `"Sansation", sans-serif`,
  "Roboto Flex": `"Roboto Flex", sans-serif`,
  "Merriweather": `"Merriweather", serif`,
  "Noto Serif": `"Noto Serif", serif`,
  "Shizuru": `"Shizuru", system-ui`,
  "Chewy": `"Chewy", system-ui`,
  "Chicle": `"Chicle", serif`,
  "Lakki Reddy": `"Lakki Reddy", serif`,
  "Imperial Script": `"Imperial Script", cursive`,
  "Luxurious Script": `"Luxurious Script", cursive`,
  "Puppies Play": `"Puppies Play", cursive`,
  "Bonheur Royale": `"Bonheur Royale", cursive`,
  "Pacifico": `"Pacifico", cursive`,
  "Sour Gummy": `"Sour Gummy", sans-serif`,
  "Nanum Pen Script": `"Nanum Pen Script", cursive`, // maybe--
  "Grenze Gotisch": `"Grenze Gotisch", serif`,
  "Texturina": `"Texturina", serif`,
  "Sancreek": `"Sancreek", serif`,
  "Rye": `"Rye", serif`,
  "UnifrakturMaguntia": `"UnifrakturMaguntia", cursive`,
  "Audiowide": `"Audiowide", sans-serif`,
  "Unica One": `"Unica One", sans-serif`,
  "Atomic Age": `"Atomic Age", system-ui`,
  "Tulpen One": `"Tulpen One", sans-serif`,
  "Metal Mania": `"Metal Mania", system-ui`,
  "Caveat Brush": `"Caveat Brush", cursive`,
  "Iceberg": `"Iceberg", sans-serif`,
  "Press Start 2P": `"Press Start 2P", system-ui`,
  "Times New Roman" : `"Times New Roman", serif`
}

export const fontStyle : Record<FontName, string[]> = {
  "Google Sans Code": [`normal`],
  "Sansation": [`normal`, `italic`],
  "Roboto Flex": [`normal`],
  "Merriweather": [`normal`],
  "Noto Serif": [`normal`],
  "Shizuru": [`normal`],
  "Chewy": [`normal`],
  "Chicle": [`normal`],
  "Lakki Reddy": [`normal`],
  "Imperial Script": [`normal`],
  "Luxurious Script": [`normal`],
  "Puppies Play": [`normal`],
  "Bonheur Royale": [`normal`],
  "Pacifico": [`normal`],
  "Sour Gummy": [`normal`, `italic`],
  "Nanum Pen Script": [`normal`],
  "Grenze Gotisch": [`normal`],
  "Texturina": [`normal`, `italic`],
  "Sancreek": [`normal`],
  "Rye": [`normal`],
  "UnifrakturMaguntia": [`normal`],
  "Audiowide": [`normal`],
  "Unica One": [`normal`],
  "Atomic Age": [`normal`],
  "Tulpen One": [`normal`],
  "Metal Mania": [`normal`],
  "Caveat Brush": [`normal`],
  "Iceberg": [`normal`],
  "Press Start 2P": [`normal`],
  "Times New Roman" : [`normal`]
}

export const fontWeight : Record<FontName, number[]> = { 

  "Google Sans Code": [300, 400, 500, 600, 700, 800],
  "Sansation": [300, 400, 700],
  "Roboto Flex": [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  "Merriweather": [300, 400, 600, 700, 800, 900],
  "Noto Serif": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Shizuru": [400],
  "Chewy": [400],
  "Chicle": [400],
  "Lakki Reddy": [400],
  "Imperial Script": [400],
  "Luxurious Script": [400],
  "Puppies Play": [400],
  "Bonheur Royale": [400],
  "Pacifico": [400],
  "Sour Gummy": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Nanum Pen Script": [400],
  "Grenze Gotisch": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Texturina": [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "Sancreek": [400],
  "Rye": [400],
  "UnifrakturMaguntia": [400],
  "Audiowide": [400],
  "Unica One": [400],
  "Atomic Age": [400],
  "Tulpen One": [400],
  "Metal Mania": [400],
  "Caveat Brush": [400],
  "Iceberg": [400],
  "Press Start 2P": [400],
  "Times New Roman" : [400, 700, 900]
}

const loaded = new Set<FontName>()
const loading = new Map<FontName, Promise<boolean>>()
const failed = new Set<FontName>()

function loadFontFromUrl(url: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const existingLink = document.querySelector(`link[href="${url}"]`)
    if (existingLink) {
      resolve(true)
      return
    }

    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = url

    link.onload = () => resolve(true)
    link.onerror = () => reject(new Error(`Failed to load CSS from ${url}`))

    document.head.appendChild(link)

    // Timeout after 10 seconds
    setTimeout(() => {
      reject(new Error(`Font loading timed out: ${url}`))
    }, 10000)
  })
}

export async function loadFont(key: FontName): Promise<boolean> {
  if (!(key in fontImports)) {
    throw new Error("Invalid Font Style")
  }
  if (loaded.has(key)) {
    return true
  }
  if (loading.has(key)) {
    return await loading.get(key)!
  }
  if (failed.has(key)) {
    throw new Error("Unable to fetch Required Font")
  }

  const url = fontImports[key]
  if (!url || url.trim() === "") {
    throw new Error(`No URL configured for font: ${key}`)
  }

  try {
    const loadPromise = loadFontFromUrl(url)
    loading.set(key, loadPromise)

    const result = await loadPromise

    loaded.add(key)
    loading.delete(key)

    return result
  } catch (error) {
    failed.add(key)
    loading.delete(key)
    throw error
  }
}

export function hasFontLoadFailed(key: FontName) {
  return failed.has(key)
}
