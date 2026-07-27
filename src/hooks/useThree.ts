import { useMemo } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  return reduced
}

export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return scrollY
}

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, { threshold: 0.1, rootMargin: '50px', ...options })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [options])

  return [ref, isIntersecting]
}

// Three.js specific hooks
export function useThreeScene() {
  const { scene, camera, gl, size, viewport } = useThree()
  return { scene, camera, gl, size, viewport }
}

export function useThreeClock() {
  const clock = useRef({ elapsed: 0, delta: 0, oldTime: 0 })
  
  useFrame(({ clock: threeClock }) => {
    clock.current.elapsed = threeClock.getElapsedTime()
    clock.current.delta = threeClock.getDelta()
  })
  
  return clock.current
}

export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useFrame(() => {
    frameCount.current++
    const now = performance.now()
    if (now - lastTime.current >= 1000) {
      setFps(Math.round(frameCount.current * 1000 / (now - lastTime.current)))
      frameCount.current = 0
      lastTime.current = now
    }
  })

  return fps
}

export function useRandomSeeds(count: number) {
  return useMemo(() => 
    Array.from({ length: count }, () => Math.random()), 
    [count]
  )
}