"use client"

import React from "react"

// Add useEffectEvent to React if it doesn't exist
if (!("useEffectEvent" in React)) {
  // Implementation of useEffectEvent using useCallback and useRef
  ;(React as any).useEffectEvent = function useEffectEvent<T extends (...args: any[]) => any>(callback: T): T {
    const callbackRef = React.useRef(callback)

    // Update the ref each render to ensure it's always the latest callback
    callbackRef.current = callback

    // The returned callback uses the ref to call the latest callback
    return React.useCallback((...args: Parameters<T>) => {
      return callbackRef.current(...args)
    }, []) as T
  }
}
