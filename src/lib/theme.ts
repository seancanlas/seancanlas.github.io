export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

export function currentTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function updateToggles(theme: Theme) {
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    const label = theme === 'dark' ? button.dataset.labelLight : button.dataset.labelDark
    if (label) button.setAttribute('aria-label', label)
    button.setAttribute('aria-pressed', String(theme === 'dark'))
  })
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.dataset.theme = theme
  root.style.colorScheme = theme
  updateToggles(theme)
  window.dispatchEvent(new CustomEvent<Theme>('themechange', { detail: theme }))
}

export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme)
  applyTheme(theme)
}

export function toggleTheme() {
  setTheme(currentTheme() === 'dark' ? 'light' : 'dark')
}

export function initTheme() {
  updateToggles(currentTheme())
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', toggleTheme)
  })
}
