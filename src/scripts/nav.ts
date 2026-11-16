const header = document.querySelector<HTMLElement>('[data-header]')
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]')
const menu = document.querySelector<HTMLElement>('[data-menu]')

if (header) {
  let ticking = false
  const updateHeader = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 8)
    ticking = false
  }

  updateHeader()
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(updateHeader)
    },
    { passive: true }
  )
}

const closeMenu = () => {
  if (!menu || !menuButton) return
  menu.hidden = true
  menuButton.setAttribute('aria-expanded', 'false')
  if (menuButton.dataset.labelOpen) menuButton.setAttribute('aria-label', menuButton.dataset.labelOpen)
}

if (menu && menuButton) {
  menuButton.addEventListener('click', () => {
    const open = menu.hidden
    menu.hidden = !open
    menuButton.setAttribute('aria-expanded', String(open))
    const label = open ? menuButton.dataset.labelClose : menuButton.dataset.labelOpen
    if (label) menuButton.setAttribute('aria-label', label)
  })

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu()
  })
}

const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]'))
const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))

if (navLinks.length > 0 && sections.length > 0) {
  const setActive = (id: string) => {
    navLinks.forEach((link) => {
      const active = link.hash === `#${id}`
      link.toggleAttribute('data-active', active)
      if (active) link.setAttribute('aria-current', 'page')
      else link.removeAttribute('aria-current')
    })
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) setActive(visible[0].target.id)
    },
    { rootMargin: '-40% 0px -55% 0px' }
  )

  sections.forEach((section) => observer.observe(section))
}
