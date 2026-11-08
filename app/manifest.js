export default function manifest() {
  return {
    id: '/',
    name: 'WeatherApp PWA',
    short_name: 'WeatherPWA',
    description: 'Pronostico PWA en Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#38bdf8',
    icons: [
      {
        src: '/icon/clima72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: '/icon/clima96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icon/clima128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: '/icon/clima144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon/clima152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: '/icon/clima192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon/clima512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    screenshots: [
      {
        src: '/icon/clima512.png',
        sizes: '512x512',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Vista de escritorio',
      },
      {
        src: '/icon/clima512.png',
        sizes: '512x512',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Vista móvil',
      },
    ],
  };
}