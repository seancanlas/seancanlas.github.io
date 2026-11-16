import { useEffect, useState } from 'react'
import { currentTheme, type Theme } from '@/lib/theme'

export type { Theme }

/** Reads the theme set on <html> by the inline boot script and tracks changes. */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(currentTheme())
    const onChange = (event: Event) => setTheme((event as CustomEvent<Theme>).detail)
    window.addEventListener('themechange', onChange)
    return () => window.removeEventListener('themechange', onChange)
  }, [])

  return theme
}
