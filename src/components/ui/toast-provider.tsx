"use client"

import { createContext, useContext } from "react"
import { useToast } from "@/hooks/use-toast"

const ToastContext = createContext<ReturnType<typeof useToast> | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastMethods = useToast()

  return (
    <ToastContext.Provider value={toastMethods}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toastMethods.toasts.map((toast) => (
          <div
            key={toast.id}
            className={`max-w-sm p-4 rounded-lg shadow-lg border backdrop-blur-sm animate-in slide-in-from-right-full duration-300 ${
              toast.variant === "destructive"
                ? "bg-destructive/90 text-destructive-foreground border-destructive"
                : "bg-background/90 text-foreground border-border"
            }`}
          >
            {toast.title && (
              <div className="font-semibold text-sm mb-1">{toast.title}</div>
            )}
            {toast.description && (
              <div className="text-sm text-muted-foreground">{toast.description}</div>
            )}
            {toast.action && <div className="mt-2">{toast.action}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastContext must be used within a ToastProvider")
  }
  return context
}