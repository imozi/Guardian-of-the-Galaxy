/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Listener } from '@/types/core'

export class EventBus<
  E extends string = string,
  M extends { [K in E]: any[] } = Record<E, any[]>
> {
  private listeners: { [key in E]?: Listener<M[E]>[] } = {}

  on(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event]?.push(callback)
  }

  off(event: E, callback: Listener<M[E]>) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event] = this.listeners[event]?.filter(
      listener => listener !== callback
    )
  }

  emit(event: E, ...args: M[E]) {
    if (!this.listeners[event]) {
      return
    }

    this.listeners[event]?.forEach(listener => {
      listener(...args)
    })
  }
}
