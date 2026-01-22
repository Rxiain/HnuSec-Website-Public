// This is a build-time script to help identify the issue
// You can run this manually if needed
console.log("If you see this message during build, please check your components for useEffectEvent imports")
console.log('Replace: import { useEffectEvent } from "react"')
console.log('With: import { useEvent } from "@/hooks/use-event"')
