export default function manifest(){
    return{
        name: "WeatherApp PWA ",
        short_name: '"WeatherPWA',
        descripcion: "pronostico PWA en Next.Js",
        start_url: '/',
        display: "standalone",
        background_color: '#0f172a',
        theme_color: '#38bdf8',
        icons:[
            {
                src:'/icon/clima72.png',
                size: '72x72',
                type: 'image/png'
            },
            {
                 src:'/icon/clima96.png',
                size: '96x92',
                type: 'image/png'
            },
            {
                 src:'/icon/clima128.png',
                size: '128x128',
                type: 'image/png'
            },
            {
                 src:'/icon/clima144.png',
                size: '144x144',
                type: 'image/png'
            },
            {
                 src:'/icon/clima152.png',
                size: '152x152',
                type: 'image/png'
            },
            {
                 src:'/icon/clima192.png',
                size: '192x192',
                type: 'image/png'
            },
            {
                 src:'/icon/clima348.png',
                size: '348x348',
                type: 'image/png'
            },
            {
                 src:'/icon/clima512.png',
                size: '512x512',
                type: 'image/png'
            }

        ]
    }
}