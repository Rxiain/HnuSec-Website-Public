"use client"

import { useCallback, useRef } from "react"

// This is a stable callback that doesn't change on re-renders
// It's a replacement for the experimental useEffectEvent
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef(callback)

  // Update the ref each render to ensure it's always the latest callback
  callbackRef.current = callback

  // The returned callback uses the ref to call the latest callback
  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args)
  }, []) as T
}
