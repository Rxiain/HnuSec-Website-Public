"use client"

import { useCallback, useRef } from "react"

/**
 * A polyfill for the experimental useEffectEvent React hook
 * This provides the same functionality but uses standard React hooks
 */
export function useEffectEvent<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback)

  // Update the ref each render to ensure it's always the latest callback
  callbackRef.current = callback

  // The returned callback uses the ref to call the latest callback
  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args)
  }, []) as T
}

// Also export as default for easier imports
export default useEffectEvent
