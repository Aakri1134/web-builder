export const fonts = {
  "Google Sans Code": `https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&display=swap`,
  Sansation: `https://fonts.googleapis.com/css2?family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap`,
  "Roboto Flex": `https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap`,
  Merriweather: `https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap`,
  "Noto Serif": `https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap`,
  Shizuru: `https://fonts.googleapis.com/css2?family=Shizuru&display=swap`,
  Chewy: `https://fonts.googleapis.com/css2?family=Chewy&family=Shizuru&display=swap`,
  Chicle: ``,
  "Lakki Reddy": ``,
  "Imperial Script": ``,
  "Luxurious Script": ``,
  "Puppies Play": ``,
  "Bonheur Royale": ``,
  Pacifico: ``,
  "Sour Gummy": ``,
  "Nanum Pen Script": ``,
  "Grenze Gotisch": ``,
  Texturina: ``,
  Sancreek: ``,
  Rye: ``,
  UnifrakturMaguntia: ``,
  Audiowide: ``,
  "Unica One": ``,
  "Atomic Age": ``,
  "Tulpen One": ``,
  "Metal Mania": ``,
  "Caveat Brush": ``,
  Iceberg: ``,
  "Press Start 2P": ``,
}

export type FontName = keyof typeof fonts

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
  if (!(key in fonts)) {
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

  const url = fonts[key]
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
