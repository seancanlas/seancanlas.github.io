import type * as THREE from 'three'

declare module 'three' {
  interface Object3D {
    userData: {
      techItem?: import('@/types').TechItem
      index?: number
      [key: string]: unknown
    }
  }
}

export interface ThreeSceneProps {
  className?: string
  fallback?: React.ReactNode
}