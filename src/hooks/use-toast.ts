import { useState, useCallback } from "react"

export interface ToastProps {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export interface Toast {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

let toastCount = 0

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    ({ title, description, action, variant = "default" }: Omit<ToastProps, "id">) => {
      const id = (++toastCount).toString()
      const newToast: Toast = {
        id,
        title,
        description,
        action,
        variant,
      }

      setToasts((prevToasts) => [...prevToasts, newToast])

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        dismiss(id)
      }, 5000)

      return {
        id,
        dismiss: () => dismiss(id),
        update: (props: Partial<ToastProps>) => update(id, props),
      }
    },
    []
  )

  const dismiss = useCallback((toastId: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId))
  }, [])

  const update = useCallback((toastId: string, props: Partial<ToastProps>) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === toastId ? { ...toast, ...props } : toast
      )
    )
  }, [])

  return {
    toast,
    dismiss,
    toasts,
  }
}