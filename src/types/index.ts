export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  image: string
  images?: string[]
  /** Optional light-theme variant of `image`. Falls back to `image`. */
  imageLight?: string
  /** Optional light-theme variant of `images`. Falls back to `images`. */
  imagesLight?: string[]
  url: string
  relatedSite?: { name: string; url: string }
  repo?: string
  featured: boolean
  status: 'live' | 'building'
  category: string
  stack: Array<{ name: string; brand: string }>
  architecture?: string
  metrics?: Record<string, string>
  challenges?: string[]
  highlights?: string[]
  timeline: string
  role: string
  /** Project accent palette used for switcher and action buttons. */
  mainColour?: ProjectAccent
}

export interface ProjectAccent {
  /** Solid color used for the active button background & borders (e.g. 'red-500'). */
  bg: string
  /** Text color on top of `bg` (typically 'white'). */
  text: string
  /** Solid color for borders / accents (e.g. 'red-500'). */
  border: string
  /** Optional hover bg token. Defaults to `bg`. */
  hoverBg?: string
  /** Optional shadow color (e.g. 'red-500'). */
  shadow?: string
}

export interface SocialLink {
  label: string
  href: string
  external?: boolean
}
