export type BadgeBrand =
  | 'brand-php'
  | 'brand-laravel'
  | 'brand-symfony'
  | 'brand-ts'
  | 'brand-js'
  | 'brand-tailwind'
  | 'brand-node'
  | 'brand-react'
  | 'brand-vue'
  | 'brand-twig'
  | 'brand-pg'
  | 'brand-mysql'
  | 'brand-redis'
  | 'brand-linux'
  | 'brand-nginx'
  | 'brand-docker'
  | 'brand-gitlab'
  | 'brand-github'
  | 'brand-jetbrains'
  | 'brand-anthropic'
  | 'brand-claude'
  | 'brand-openai'
  | 'brand-opencode'
  | 'brand-maple'
  | 'brand-python'
  | 'brand-fastapi'
  | 'brand-rust'
  | 'brand-vitest'

export const badgeVariants: Record<
  'default' | 'secondary' | 'destructive' | 'outline' | BadgeBrand,
  string
> = {
  default: 'bg-accent-soft text-accent border border-accent-border',
  secondary: 'bg-bg-hover text-text-secondary border border-border-muted',
  destructive: 'bg-red-600/10 text-red-500 border border-red-600/20',
  outline: 'text-text-primary border border-border-muted',
  'brand-php': 'bg-brand-php-soft text-brand-php border border-brand-php-border',
  'brand-laravel': 'bg-brand-laravel-soft text-brand-laravel border border-brand-laravel-border',
  'brand-symfony': 'bg-brand-symfony-soft text-brand-symfony-text border border-brand-symfony-border',
  'brand-twig': 'bg-brand-twig-soft text-brand-twig border border-brand-twig-border',
  'brand-ts': 'bg-brand-ts-soft text-brand-ts border border-brand-ts-border',
  'brand-js': 'bg-brand-js-soft text-brand-js border border-brand-js-border',
  'brand-tailwind': 'bg-brand-tailwind-soft text-brand-tailwind border border-brand-tailwind-border',
  'brand-node': 'bg-brand-node-soft text-brand-node border border-brand-node-border',
  'brand-react': 'bg-brand-react-soft text-brand-react border border-brand-react-border',
  'brand-vue': 'bg-brand-vue-soft text-brand-vue border border-brand-vue-border',
  'brand-pg': 'bg-brand-pg-soft text-brand-pg border border-brand-pg-border',
  'brand-mysql': 'bg-brand-mysql-soft text-brand-mysql border border-brand-mysql-border',
  'brand-redis': 'bg-brand-redis-soft text-brand-redis border border-brand-redis-border',
  'brand-linux': 'bg-brand-linux-soft text-brand-linux border border-brand-linux-border',
  'brand-nginx': 'bg-brand-nginx-soft text-brand-nginx border border-brand-nginx-border',
  'brand-docker': 'bg-brand-docker-soft text-brand-docker border border-brand-docker-border',
  'brand-gitlab': 'bg-brand-gitlab-soft text-brand-gitlab border border-brand-gitlab-border',
  'brand-github': 'bg-brand-github-soft text-brand-github border border-brand-github-border',
  'brand-jetbrains': 'bg-brand-jetbrains-soft text-brand-jetbrains-text border border-brand-jetbrains-border',
  'brand-anthropic': 'bg-brand-anthropic-soft text-brand-anthropic border border-brand-anthropic-border',
  'brand-claude': 'bg-brand-claude-soft text-brand-claude border border-brand-claude-border',
  'brand-openai': 'bg-brand-openai-soft text-brand-openai border border-brand-openai-border',
  'brand-opencode': 'bg-brand-opencode-soft text-brand-opencode border border-brand-opencode-border',
  'brand-maple': 'bg-brand-maple-soft text-brand-maple border border-brand-maple-border',
  'brand-python': 'bg-brand-python-soft text-brand-python border border-brand-python-border',
  'brand-fastapi': 'bg-brand-fastapi-soft text-brand-fastapi border border-brand-fastapi-border',
  'brand-rust': 'bg-brand-rust-soft text-brand-rust border border-brand-rust-border',
  'brand-vitest': 'bg-brand-vitest-soft text-brand-vitest border border-brand-vitest-border',
}

export function getBrandVariant(name: string): BadgeBrand | undefined {
  const n = name.toLowerCase().trim()

  if (/rust|axum|tokio/.test(n)) return 'brand-rust'
  if (/vitest/.test(n)) return 'brand-vitest'
  if (/sqlx|postgres|\bpg\b/.test(n)) return 'brand-pg'
  if (/claude|anthropic/.test(n)) return 'brand-claude'
  if (/codex|openai/.test(n)) return 'brand-openai'
  if (/opencode/.test(n)) return 'brand-opencode'
  if (/^laravel$/.test(n)) return 'brand-laravel'
  if (/^php$/.test(n)) return 'brand-php'
  if (/^twig$/.test(n)) return 'brand-twig'
  if (/phpstorm|jetbrains|intellij|webstorm|pycharm|goland|rider/.test(n)) return 'brand-jetbrains'
  if (/composer/.test(n)) return 'brand-php'
  if (/^symfony$/.test(n)) return 'brand-symfony'
  if (/^django$/.test(n) || /^python$/.test(n) || /^flask$/.test(n)) return 'brand-python'
  if (/^fastapi$/.test(n)) return 'brand-fastapi'
  if (/^typescript$|^ts$/.test(n)) return 'brand-ts'
  if (/^javascript$|^js$/.test(n)) return 'brand-js'
  if (/tailwind/.test(n)) return 'brand-tailwind'
  if (/^next\.?js$/.test(n) || /^react/.test(n) || /motion/.test(n)) return 'brand-react'
  if (/^nuxt$/.test(n) || /^vue/.test(n)) return 'brand-vue'
  if (/^node(\.?js)?$/.test(n) || /^express$/.test(n) || /^fastify$/.test(n) || /playwright/.test(n)) return 'brand-node'
  if (/^nest(js)?$/.test(n)) return 'brand-ts'
  if (/^mysql$|mariadb/.test(n)) return 'brand-mysql'
  if (/^redis$|memcached/.test(n)) return 'brand-redis'
  if (/^mongo/.test(n)) return 'brand-node'
  if (/^elasticsearch$/.test(n)) return 'brand-docker'
  if (/sqlite/.test(n)) return 'brand-ts'
  if (/^docker$|compose/.test(n)) return 'brand-docker'
  if (/^kubernetes$|^k8s$/.test(n)) return 'brand-docker'
  if (/^linux$/.test(n)) return 'brand-linux'
  if (/^nginx$/.test(n)) return 'brand-nginx'
  if (/^apache$/.test(n)) return 'brand-redis'
  if (/gitlab/.test(n)) return 'brand-gitlab'
  if (/github/.test(n)) return 'brand-github'
  if (/ci\/cd|pipeline|jenkins|circle/.test(n)) return 'brand-gitlab'
  if (/^git$/.test(n)) return 'brand-gitlab'

  return undefined
}
