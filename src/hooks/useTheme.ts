import * as React from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

const getInitial = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('light', theme === 'light')
}

const subscribers = new Set<(theme: Theme) => void>()

const setThemeAndNotify = (theme: Theme) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
  subscribers.forEach((fn) => fn(theme))
}

// Called by the Footer's toggle button so all components stay in sync.
export const setThemeGlobal = (theme: Theme) => setThemeAndNotify(theme)

export function useTheme(): Theme {
  const [theme, setTheme] = React.useState<Theme>(getInitial)

  React.useEffect(() => {
    // Re-sync on mount in case the Footer set the class before this hook ran.
    setTheme(getInitial())
    applyTheme(getInitial())

    const onChange = (next: Theme) => setTheme(next)
    subscribers.add(onChange)
    return () => {
      subscribers.delete(onChange)
    }
  }, [])

  return theme
}
