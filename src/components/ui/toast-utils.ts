export interface Toast {
  id?: string
  title: string
  description?: string
  status?: "info" | "success" | "warning" | "error"
  duration?: number
  closable?: boolean
}

const toaster = {
  create: (props: Toast) => {
    const event = new CustomEvent("toast", {
      detail: props,
    })
    window.dispatchEvent(event)
  },
}

export { toaster }
