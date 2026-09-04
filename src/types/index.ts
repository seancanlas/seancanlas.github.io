export interface Milestone {
  year: string
  era: string
  title: string
  subtitle: string
  icon: string
  tech: string[]
  story: string
}

export interface TechItem {
  name: string
  category: 'language' | 'framework' | 'database' | 'tool' | 'hobby'
  brand: string
  proficiency: number
  icon: string
  url?: string
}

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
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  website?: string // honeypot
}

export interface NavLink {
  label: string
  href: string
  external?: boolean
}

export interface SocialLink {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  external?: boolean
}