"use client"

import * as React from "react"

/**
 * Glass Folder Cards — a folder you can actually use, drawn as an object.
 *
 * Three layers, back to front: a back panel holding a piece of artwork, the
 * files the folder contains, and a frosted-glass front panel that blurs
 * whatever sits behind it. The files are real elements between real panels,
 * so the glass frosts them as they move.
 *
 * - Rest: flat and closed. The tops of the files only just show.
 * - Hover / focus: the front panel leans toward you on its bottom hinge.
 * - Open (click, Enter, Space): the files rise out and fan.
 * - Add (+): a new file drops into the folder and the pocket gives under it.
 * - More (···): a frosted menu.
 *
 * The artwork is generated on a canvas (domain-warped noise shaded as a
 * liquid surface). Supply `image` to use a picture of your own instead.
 *
 * Self-contained: React is the only import. No CSS file, no images, no fonts.
 */

export type ArtPreset = "aurora" | "ember" | "dusk" | "glacier" | "verdant"

export type ArtRecipe = {
  /** `marble` folds the colours through each other; `streak` pulls them into a long exposure. */
  style: "marble" | "streak"
  /** Two or more colours, in the order they appear through the field. */
  colors: string[]
  /** Size of the forms. Lower is larger and calmer. */
  scale?: number
  /** How hard the field folds into itself. */
  warp?: number
  /** Direction of the flow, in radians. */
  angle?: number
  /** Specular highlight on the liquid surface, 0–1. */
  gloss?: number
  /** Dark veins along the folds, 0–1. */
  veins?: number
}

export type FolderArt = ArtPreset | ArtRecipe | "none"

export type FolderFile = {
  name: string
  /** A short second line: a size, a date, a kind. */
  meta?: string
  /** Makes the file a picture: a generated artwork… */
  art?: ArtPreset | ArtRecipe
  /** …or an image of your own. Without either, the file is a sheet of paper. */
  image?: string
  /** Rendered as a link when the folder is open. */
  href?: string
}

export type FolderMenuItem = {
  label: string
  onSelect?: () => void
  /** Drawn in red, for the one you would want to think twice about. */
  danger?: boolean
}

export type GlassFolderProps = {
  label?: string
  /** The second line. Defaults to the number of files, which rolls as you add. */
  meta?: string
  /** `light` is milk glass, `dark` is smoked glass. */
  tone?: "light" | "dark"
  /** What the back panel holds. A preset, your own recipe, or `none` for a plain frosted back. */
  art?: FolderArt
  /** A different arrangement of the same recipe. */
  seed?: number
  /** Your own picture for the back panel, instead of generated art. */
  image?: string
  /** The folder's contents. Read once; after that the folder owns the list. */
  files?: FolderFile[]
  /** `add` drops new files in, `more` opens a menu, `none` hides the key. */
  action?: "add" | "more" | "none"
  /** What `add` puts in the folder. Return nothing for an "Untitled" sheet. */
  onAdd?: (files: FolderFile[]) => FolderFile | void
  onFilesChange?: (files: FolderFile[]) => void
  /** Items for the `more` menu. An Open / Close item is always first. */
  menu?: FolderMenuItem[]
  /** Where the label sits on the front panel. */
  labelPlacement?: "bottom-left" | "top-left" | "top-right"
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** Called when a file is chosen while the folder is open. */
  onFileSelect?: (file: FolderFile, index: number) => void
  /** Width in px. Everything else scales with it; the height is 0.96 × width. */
  width?: number
  /** Assemble itself the first time it scrolls into view. */
  appear?: boolean
  /** Delay before that entrance, in ms — for staggering a row of folders. */
  appearDelay?: number
  className?: string
  style?: React.CSSProperties
}

// #region art

export const ART_PRESETS: Record<ArtPreset, ArtRecipe> = {
  // a long exposure: blush, oxblood and steel pulled across the frame
  aurora: {
    style: "streak",
    colors: ["#f4efe9", "#e9c2b8", "#c2433f", "#2a1e2a", "#22395e", "#6f97c2", "#e5edf4"],
    scale: 0.7,
    warp: 1.4,
    angle: -0.62,
    gloss: 0.18,
    veins: 0,
  },
  // red ink folding through teal-black water
  ember: {
    style: "marble",
    colors: ["#07090c", "#16252c", "#3d5f68", "#1a1416", "#a3201a", "#ef4a2b", "#ff8a5c"],
    scale: 0.62,
    warp: 3.2,
    angle: -0.5,
    gloss: 0.55,
    veins: 0.6,
  },
  // plum and rust, swirled
  dusk: {
    style: "marble",
    colors: ["#120c18", "#3e2850", "#8f6c9c", "#2b1a24", "#b3502f", "#eab08a", "#fbe7d2"],
    scale: 0.75,
    warp: 3.6,
    angle: 0.8,
    gloss: 0.5,
    veins: 0.5,
  },
  // cold, pale, nearly white
  glacier: {
    style: "streak",
    colors: ["#f7f8fa", "#d9e2ea", "#9fb4c7", "#e8edf2", "#bccbd8", "#ffffff"],
    scale: 0.7,
    warp: 1.6,
    angle: 0.35,
    gloss: 0.25,
    veins: 0,
  },
  // moss and brass
  verdant: {
    style: "marble",
    colors: ["#070b08", "#173024", "#4f7a5a", "#141812", "#a7843a", "#e9cf87", "#fbf3d6"],
    scale: 0.7,
    warp: 3.4,
    angle: 2.1,
    gloss: 0.5,
    veins: 0.5,
  },
}

/** `#rgb` or `#rrggbb` to a triple. Anything unreadable comes back mid-grey. */
export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.trim().replace(/^#/, "")
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  const n = /^[0-9a-f]{6}$/i.test(h) ? parseInt(h, 16) : 0x808080
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/** A small, fast, seedable PRNG (mulberry32). */
export function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** A stable small integer for a string, so a file's art follows its name. */
export function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

/** Seeded gradient noise, summed into fractal octaves with a rotation between each. */
function makeFbm(seed: number): (x: number, y: number, octaves: number) => number {
  const r = rng(seed)
  const perm = new Uint8Array(512)
  const grad = new Float32Array(512)
  const p: number[] = []
  for (let i = 0; i < 256; i++) p.push(i)
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    const t = p[i]
    p[i] = p[j]
    p[j] = t
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
  for (let i = 0; i < 256; i++) {
    const a = r() * Math.PI * 2
    grad[i * 2] = Math.cos(a)
    grad[i * 2 + 1] = Math.sin(a)
  }
  const noise = (x: number, y: number): number => {
    const xi = Math.floor(x)
    const yi = Math.floor(y)
    const xf = x - xi
    const yf = y - yi
    const X = xi & 255
    const Y = yi & 255
    const h00 = perm[X + perm[Y]] * 2
    const h10 = perm[X + 1 + perm[Y]] * 2
    const h01 = perm[X + perm[Y + 1]] * 2
    const h11 = perm[X + 1 + perm[Y + 1]] * 2
    const d00 = grad[h00] * xf + grad[h00 + 1] * yf
    const d10 = grad[h10] * (xf - 1) + grad[h10 + 1] * yf
    const d01 = grad[h01] * xf + grad[h01 + 1] * (yf - 1)
    const d11 = grad[h11] * (xf - 1) + grad[h11 + 1] * (yf - 1)
    const u = xf * xf * xf * (xf * (xf * 6 - 15) + 10)
    const v = yf * yf * yf * (yf * (yf * 6 - 15) + 10)
    return d00 + u * (d10 - d00) + v * (d01 - d00 + u * (d11 - d01 - d10 + d00))
  }
  return (x, y, octaves) => {
    let sum = 0
    let amp = 0.5
    for (let i = 0; i < octaves; i++) {
      sum += amp * noise(x, y)
      const nx = 1.6 * x + 1.2 * y + 7.1
      y = -1.2 * x + 1.6 * y + 3.3
      x = nx
      amp *= 0.5
    }
    return sum
  }
}

export type ArtJob = {
  width: number
  height: number
  /** RGBA, ready for `new ImageData(pixels, width, height)`. */
  pixels: Uint8ClampedArray
  /** Paint up to `rows` more rows. Returns true once the picture is finished. */
  step: (rows: number) => boolean
}

/**
 * The artwork, as a job that can be spread over several frames.
 * A field is domain-warped twice, normalised by its own percentiles, then
 * shaded as the height of a liquid surface (diffuse light, tight specular,
 * fine striations along the contours). `streak` squeezes one axis first,
 * which turns the same folds into a long-exposure smear.
 */
export function createArtJob(width: number, height: number, recipe: ArtRecipe, seed: number): ArtJob {
  const w = Math.max(1, Math.round(width))
  const h = Math.max(1, Math.round(height))
  const colors = recipe.colors.length >= 2 ? recipe.colors : ["#111111", "#eeeeee"]
  const stops = colors.map((c, i) => ({ t: i / (colors.length - 1), c: hexToRgb(c) }))
  const scale = recipe.scale ?? 0.7
  const warp = recipe.warp ?? 3
  const gloss = recipe.gloss ?? 0.4
  const veins = recipe.veins ?? 0
  const streak = recipe.style === "streak"
  const fbm = makeFbm(seed * 977 + 13)
  const r = rng(seed + 1)
  const ox = r() * 50
  const oy = r() * 50
  const angle = (recipe.angle ?? 0) + (r() - 0.5) * 0.5
  const ca = Math.cos(angle)
  const sa = Math.sin(angle)
  const m = Math.min(w, h)
  // Sampled on a half-resolution grid, brought up with Catmull-Rom.
  const gw = Math.ceil(w / 2) + 3
  const gh = Math.ceil(h / 2) + 3
  const G = new Float32Array(gw * gh)
  const GQ = new Float32Array(gw * gh)
  const F = new Float32Array(w * h)
  const Q = new Float32Array(w * h)
  const pixels = new Uint8ClampedArray(w * h * 4)
  let row = 0

  const field = (gy: number) => {
    for (let gx = 0; gx < gw; gx++) {
      const u = ((gx - 1) * 2 - w / 2) / m
      const v = ((gy - 1) * 2 - h / 2) / m
      let px = (u * ca - v * sa) * scale
      let py = (u * sa + v * ca) * scale
      if (streak) {
        px *= 0.14
        py *= 2.2
      }
      px += ox
      py += oy
      const qx = fbm(px, py, 3)
      const qy = fbm(px + 5.2, py + 1.3, 3)
      const rx = fbm(px + warp * qx + 1.7, py + warp * qy + 9.2, 3)
      const ry = fbm(px + warp * qx + 8.3, py + warp * qy + 2.8, 3)
      G[gy * gw + gx] = fbm(px + warp * rx, py + warp * ry, 4)
      GQ[gy * gw + gx] = Math.sqrt(qx * qx + qy * qy)
    }
  }

  const upsample = () => {
    const cr = (a: number, b: number, c: number, d: number) => (-a + 9 * b + 9 * c - d) / 16
    const T = new Float32Array(w * gh)
    for (let gy = 0; gy < gh; gy++) {
      const rr = gy * gw
      for (let x = 0; x < w; x++) {
        const c = (x >> 1) + 1
        T[gy * w + x] = x & 1 ? cr(G[rr + c - 1], G[rr + c], G[rr + c + 1], G[rr + c + 2]) : G[rr + c]
      }
    }
    for (let y = 0; y < h; y++) {
      const c = (y >> 1) + 1
      for (let x = 0; x < w; x++) {
        F[y * w + x] =
          y & 1 ? cr(T[(c - 1) * w + x], T[c * w + x], T[(c + 1) * w + x], T[(c + 2) * w + x]) : T[c * w + x]
        const gx = (x >> 1) + 1
        const q0 = GQ[c * gw + gx]
        const qx = x & 1 ? (q0 + GQ[c * gw + gx + 1]) / 2 : q0
        const q1 = y & 1 ? (x & 1 ? (GQ[(c + 1) * gw + gx] + GQ[(c + 1) * gw + gx + 1]) / 2 : GQ[(c + 1) * gw + gx]) : qx
        Q[y * w + x] = (qx + q1) / 2
      }
    }
  }

  const colorize = () => {
    const sample: number[] = []
    const stride = Math.max(1, Math.floor(F.length / 4096))
    for (let i = 0; i < F.length; i += stride) sample.push(F[i])
    sample.sort((a, b) => a - b)
    const lo = sample[Math.floor(sample.length * 0.02)]
    const hi = sample[Math.floor(sample.length * 0.98)]
    const k = 1 / (hi - lo || 1)
    const lx = -0.55
    const ly = -0.65
    const lz = 0.52
    const slope = k * m * 0.012
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = y * w + x
        let t = (F[i] - lo) * k
        t = t < 0 ? 0 : t > 1 ? 1 : t
        let j = 1
        while (j < stops.length - 1 && stops[j].t < t) j++
        const a = stops[j - 1]
        const b = stops[j]
        let f = (t - a.t) / (b.t - a.t || 1)
        f = f < 0 ? 0 : f > 1 ? 1 : f
        f = f * f * (3 - 2 * f)
        const gx = (F[x < w - 1 ? i + 1 : i] - F[x > 0 ? i - 1 : i]) * slope
        const gy = (F[y < h - 1 ? i + w : i] - F[y > 0 ? i - w : i]) * slope
        const nd = (-gx * lx - gy * ly + lz) / Math.sqrt(gx * gx + gy * gy + 1)
        const spec = Math.pow(nd > 0 ? nd : 0, 24) * gloss * 255
        const silk = 1 + 0.035 * Math.sin(t * 150 + Q[i] * 24)
        const vein = veins * Math.max(0, 1 - Math.abs(Q[i] - 0.42) * 14) * 0.6
        const lit = (0.82 + 0.28 * nd) * silk * (1 - vein)
        pixels[i * 4] = (a.c[0] + (b.c[0] - a.c[0]) * f) * lit + spec
        pixels[i * 4 + 1] = (a.c[1] + (b.c[1] - a.c[1]) * f) * lit + spec
        pixels[i * 4 + 2] = (a.c[2] + (b.c[2] - a.c[2]) * f) * lit + spec
        pixels[i * 4 + 3] = 255
      }
    }
  }

  const step = (rows: number): boolean => {
    if (row >= gh) return true
    const end = Math.min(gh, row + Math.max(1, rows))
    while (row < end) field(row++)
    if (row < gh) return false
    upsample()
    colorize()
    return true
  }

  return { width: w, height: h, pixels, step }
}

/** Where a file sits in the fan: -1 … 1 across the visible stack, 0 for one file. */
export function fanSlot(index: number, count: number): number {
  return count <= 1 ? 0 : (index / (count - 1)) * 2 - 1
}

// #endregion

const recipeOf = (art: ArtPreset | ArtRecipe): ArtRecipe => (typeof art === "string" ? ART_PRESETS[art] : art)

// ---------------------------------------------------------------------------
// One shared painter: every folder queues its art here and the queue spends a
// few milliseconds a frame, so a row of folders never janks.

type Painted = HTMLCanvasElement
const artCache = new Map<string, Promise<Painted>>()
const queue: { job: ArtJob; priority: number; done: (c: Painted) => void }[] = []
let pumping = false

function pump() {
  if (pumping) return
  pumping = true
  const tick = () => {
    const until = performance.now() + 7
    while (queue.length && performance.now() < until) {
      const head = queue[0]
      if (head.job.step(4)) {
        queue.shift()
        const c = document.createElement("canvas")
        c.width = head.job.width
        c.height = head.job.height
        c.getContext("2d")?.putImageData(new ImageData(head.job.pixels as Uint8ClampedArray<ArrayBuffer>, c.width, c.height), 0, 0)
        head.done(c)
      }
    }
    if (queue.length) requestAnimationFrame(tick)
    else pumping = false
  }
  requestAnimationFrame(tick)
}

/** Lower priority paints first: back panels (0) before the files tucked behind glass (1). */
function paint(recipe: ArtRecipe, seed: number, w: number, h: number, priority: number): Promise<Painted> {
  const key = JSON.stringify([recipe, seed, w, h])
  let p = artCache.get(key)
  if (!p) {
    p = new Promise<Painted>((done) => {
      let at = queue.length
      while (at > 1 && queue[at - 1].priority > priority) at--
      queue.splice(at, 0, { job: createArtJob(w, h, recipe, seed), priority, done })
      pump()
    })
    artCache.set(key, p)
  }
  return p
}

function ArtCanvas({
  art,
  seed,
  w,
  h,
  density,
  priority,
  className,
}: {
  art: ArtPreset | ArtRecipe
  seed: number
  w: number
  h: number
  density: number
  priority: number
  className?: string
}) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = React.useState(false)
  const recipe = recipeOf(art)
  const key = JSON.stringify(recipe)
  const pw = Math.round(w * density)
  const ph = Math.round(h * density)

  React.useEffect(() => {
    let live = true
    setReady(false)
    paint(JSON.parse(key) as ArtRecipe, seed, pw, ph, priority).then((src) => {
      const c = ref.current
      if (!live || !c) return
      c.width = src.width
      c.height = src.height
      c.getContext("2d")?.drawImage(src, 0, 0)
      setReady(true)
    })
    return () => {
      live = false
    }
  }, [key, seed, pw, ph, priority])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      data-ready={ready || undefined}
      style={{ width: w, height: h, maxWidth: "none" }}
    />
  )
}

// ---------------------------------------------------------------------------
// Geometry, in the folder's own units (340 × 272), scaled to `width`.

const W = 340
const H = 272
const HEADROOM = 54 // room above the back panel for the files to rise into
const FRONT_TOP = 74
const FRONT_H = H - FRONT_TOP
const SHEET_W = 272
const SHEET_H = 184

const BACK_PATH =
  "M0 56A22 22 0 0 1 22 34L146 34C170 34 172 0 198 0L318 0A22 22 0 0 1 340 22L340 250A22 22 0 0 1 318 272L22 272A22 22 0 0 1 0 250Z"
const FRONT_PATH =
  "M0 22A22 22 0 0 1 22 0L118 0C144 0 146 32 172 32L318 32A22 22 0 0 1 340 54L340 " +
  (FRONT_H - 22) +
  "A22 22 0 0 1 318 " +
  FRONT_H +
  "L22 " +
  FRONT_H +
  "A22 22 0 0 1 0 " +
  (FRONT_H - 22) +
  "Z"

const SAMPLE_FILES: FolderFile[] = [
  { name: "Cover — final", meta: "PNG · 4.8 MB", art: "ember" },
  { name: "Moodboard", meta: "24 images", art: "dusk" },
  { name: "Brief.pdf", meta: "PDF · 1.2 MB" },
]

export default function GlassFolder({
  label = "My Files",
  meta,
  tone = "light",
  art = "aurora",
  seed = 3,
  image,
  files: initialFiles = SAMPLE_FILES,
  action = "add",
  onAdd,
  onFilesChange,
  menu = [],
  labelPlacement = "bottom-left",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  onFileSelect,
  width = 340,
  appear = true,
  appearDelay = 0,
  className,
  style,
}: GlassFolderProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const rootRef = React.useRef<HTMLDivElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const [files, setFiles] = React.useState<FolderFile[]>(initialFiles)
  // ids survive re-renders so a newly added file is the only one that animates in
  const ids = React.useRef<number[]>(initialFiles.map((_, i) => i))
  const nextId = React.useRef(initialFiles.length)
  const [bump, setBump] = React.useState(0)

  const [openState, setOpenState] = React.useState(defaultOpen)
  const open = openProp ?? openState
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenState(next)
      onOpenChange?.(next)
    },
    [openProp, onOpenChange]
  )

  const [hovered, setHovered] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [reduced, setReduced] = React.useState(false)
  const [shown, setShown] = React.useState(!appear)

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  React.useEffect(() => {
    if (!appear || shown) return
    const el = rootRef.current
    if (!el) return
    let timer: number | undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        timer = window.setTimeout(() => setShown(true), appearDelay)
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [appear, appearDelay, shown])

  // Close the menu on an outside press
  React.useEffect(() => {
    if (!menuOpen) return
    const onDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener("pointerdown", onDown)
    return () => document.removeEventListener("pointerdown", onDown)
  }, [menuOpen])

  const commit = (next: FolderFile[]) => {
    setFiles(next)
    onFilesChange?.(next)
  }

  const addFile = () => {
    const created = onAdd?.(files) as FolderFile | undefined
    const file: FolderFile = created ?? { name: `Sans titre ${files.length + 1}`, meta: "Nouveau" }
    ids.current.push(nextId.current++)
    setBump((b) => b + 1)
    commit([...files, file])
  }

  const count = files.length
  const s = width / W
  const Y0 = HEADROOM
  const ink = tone === "dark" ? "#fbf1f2" : "#2a1518"
  const sub = tone === "dark" ? "rgba(251,241,242,0.7)" : "rgba(42,21,24,0.62)"
  const frontFill = tone === "dark" ? "rgba(24,12,14,0.45)" : "rgba(255,255,255,0.36)"
  const lift = open ? "rotateX(-16deg) translateY(-12px)" : hovered ? "rotateX(-7deg) translateY(-4px)" : "none"
  const metaText = meta ?? `${count} fichier${count > 1 ? "s" : ""}`
  const dropping = bump > 0 && !reduced

  const fileBox = (i: number): React.CSSProperties => {
    const slot = fanSlot(i, count)
    const left = 34 + (open ? slot * 30 : slot * 4)
    const top = open ? -54 + Math.abs(slot) * 10 : hovered ? 6 : 40
    return {
      position: "absolute",
      left,
      top: Y0 + top,
      width: SHEET_W,
      height: SHEET_H,
      transform: `rotate(${open ? slot * 4 : 0}deg)`,
      transformOrigin: "50% 100%",
      transition: reduced ? "none" : "all 700ms cubic-bezier(.2,.7,.2,1)",
      zIndex: 2 + i,
      pointerEvents: open ? "auto" : "none",
      animation: dropping && i === count - 1 ? `gf-${uid}-drop 700ms cubic-bezier(.2,.7,.2,1)` : undefined,
    }
  }

  const renderFile = (f: FolderFile, i: number) => {
    const key = ids.current[i] ?? i
    const inner = (
      <>
        <div className="relative h-[112px] w-full overflow-hidden" style={{ background: "#fffdfb" }}>
          {f.image ? (
            <img src={f.image} alt="" className="size-full object-cover" />
          ) : f.art ? (
            <ArtCanvas art={f.art} seed={hashString(f.name)} w={SHEET_W} h={112} density={0.5} priority={1} className="size-full" />
          ) : (
            <div
              className="size-full"
              style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 15px, rgba(120,60,60,0.12) 15px 16px)" }}
            />
          )}
        </div>
        <div className="px-4 py-3" style={{ color: "#2a1518" }}>
          <p className="truncate text-[13px] font-semibold">{f.name}</p>
          {f.meta && (
            <p className="mt-0.5 truncate text-[11px]" style={{ color: "rgba(42,21,24,0.6)" }}>
              {f.meta}
            </p>
          )}
        </div>
      </>
    )
    const box =
      "flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#fffdfb] text-left shadow-[0_10px_30px_rgba(60,20,20,0.18)] ring-1 ring-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e12a1f]"
    return (
      <div key={key} style={fileBox(i)}>
        {f.href && open ? (
          <a href={f.href} className={box} onClick={() => onFileSelect?.(f, i)}>
            {inner}
          </a>
        ) : (
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            aria-label={f.name}
            className={box}
            onClick={() => {
              if (open) onFileSelect?.(f, i)
            }}
          >
            {inner}
          </button>
        )}
      </div>
    )
  }

  const menuItems: FolderMenuItem[] = [{ label: open ? "Fermer" : "Ouvrir", onSelect: () => setOpen(!open) }, ...menu]

  const labelPos: React.CSSProperties =
    labelPlacement === "top-right"
      ? { right: 22, top: Y0 + FRONT_TOP + 16, textAlign: "right" }
      : labelPlacement === "top-left"
        ? { left: 22, top: Y0 + FRONT_TOP + 16 }
        : { left: 22, bottom: 18 }

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={label}
      className={className}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false)
          setMenuOpen(false)
        }
      }}
      style={{
        position: "relative",
        width: W * s,
        height: (Y0 + H) * s,
        opacity: shown ? 1 : 0,
        translate: shown ? "0 0" : "0 40px",
        transition: reduced ? "none" : "opacity 800ms ease, translate 800ms cubic-bezier(.2,.7,.2,1)",
        ...style,
      }}
    >
      <style>{`@keyframes gf-${uid}-drop{from{opacity:0;translate:0 -70px}to{opacity:1;translate:0 0}}@keyframes gf-${uid}-press{0%{translate:0 0}40%{translate:0 3px}100%{translate:0 0}}`}</style>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: Y0 + H, transform: `scale(${s})`, transformOrigin: "0 0", perspective: 900 }}>
        {/* Hit area: the whole folder toggles open (a real button, so Enter and Space work) */}
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${open ? "Fermer" : "Ouvrir"} ${label}`}
          onClick={() => setOpen(!open)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="absolute cursor-pointer bg-transparent focus-visible:outline-none"
          style={{ left: 0, top: 0, width: W, height: Y0 + H, zIndex: 0 }}
        />

        {/* Back panel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute overflow-hidden"
          style={{ left: 0, top: Y0, width: W, height: H, clipPath: `path('${BACK_PATH}')`, WebkitClipPath: `path('${BACK_PATH}')`, background: "#f6dcd8", zIndex: 1 }}
        >
          {image ? (
            <img src={image} alt="" className="size-full object-cover" />
          ) : art !== "none" ? (
            <ArtCanvas art={art} seed={seed} w={W} h={H} density={0.6} priority={0} className="size-full" />
          ) : null}
        </div>

        {/* Files */}
        {files.map((f, i) => renderFile(f, i))}

        {/* Front panel: frosted glass over the files */}
        <div
          key={`front-${bump}`}
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            left: 0,
            top: Y0 + FRONT_TOP,
            width: W,
            height: FRONT_H,
            clipPath: `path('${FRONT_PATH}')`,
            WebkitClipPath: `path('${FRONT_PATH}')`,
            background: frontFill,
            backdropFilter: "blur(14px) saturate(1.2)",
            WebkitBackdropFilter: "blur(14px) saturate(1.2)",
            transform: lift,
            transformOrigin: "50% 100%",
            transition: reduced ? "none" : "transform 700ms cubic-bezier(.2,.7,.2,1)",
            animation: dropping ? `gf-${uid}-press 320ms ease-out` : undefined,
            zIndex: 1000,
          }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, rgba(255,255,255,.55), rgba(255,255,255,0) 38%)" }} />
        </div>

        {/* Label */}
        <div className="pointer-events-none absolute" style={{ ...labelPos, color: ink, zIndex: 1050 }}>
          <p className="text-[18px] font-extrabold tracking-tight">{label}</p>
          <p className="mt-0.5 text-[12px]" style={{ color: sub }}>
            {metaText}
          </p>
        </div>

        {/* Key: add or more */}
        {action !== "none" && (
          <button
            type="button"
            onClick={action === "add" ? addFile : () => setMenuOpen((m) => !m)}
            aria-label={action === "add" ? "Ajouter un fichier" : "Plus d'options"}
            aria-expanded={action === "more" ? menuOpen : undefined}
            className="absolute grid size-9 place-items-center rounded-full text-lg font-bold transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#e12a1f]"
            style={{ right: 20, top: Y0 + FRONT_TOP + 14, zIndex: 1100, background: "rgba(255,255,255,0.7)", color: "#2a1518", boxShadow: "0 6px 16px rgba(60,20,20,0.18)" }}
          >
            {action === "add" ? "+" : "···"}
          </button>
        )}

        {action === "more" && menuOpen && (
          <div
            ref={menuRef}
            role="menu"
            className="absolute w-[190px] rounded-2xl p-1.5"
            style={{ right: 20, top: Y0 + FRONT_TOP + 56, zIndex: 1200, background: "rgba(255,250,250,0.9)", backdropFilter: "blur(16px)", boxShadow: "0 16px 40px rgba(60,20,20,0.22)" }}
          >
            {menuItems.map((item) => (
              <button
                key={item.label}
                role="menuitem"
                type="button"
                className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-black/5"
                style={{ color: item.danger ? "#c2261c" : "#2a1518" }}
                onClick={() => {
                  item.onSelect?.()
                  setMenuOpen(false)
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
