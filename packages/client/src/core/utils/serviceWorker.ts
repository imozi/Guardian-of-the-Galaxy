export function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log(
          'ServiceWorker registration successful with  scope: ',
          registration.scope
        )
      })
      .catch((error: string) => {
        console.log('ServiceWorker registration failed: ', error)
      })
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      for (const registration of registrations) {
        registration.unregister()
        console.log('ServiceWorker unregistered: ', registration)
      }
    })
  }
}
