// new Map
const map = new maptalks.Map('map', {
    center: [121.387, 31.129],
    zoom: 14,
    baseLayer: new maptalks.TileLayer('base', {
        urlTemplate:
            'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a', 'b', 'c', 'd'],
        attribution:
            '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',
        maxAvailableZoom: 18,
        placeholder: true,
    }),
    scaleControl: { position: 'bottom-right', metric: true, imperial: true },
    zoomControl: {
        position: { top: 80, right: 20 },
        slider: false,
        zoomLevel: true,
    },
    spatialReference: {
        projection: 'EPSG:3857',
        resolutions: (function () {
            const resolutions = []
            const d = 2 * 6378137 * Math.PI
            for (let i = 0; i < 22; i++) {
                resolutions[i] = d / (256 * Math.pow(2, i))
            }
            return resolutions
        })(),
        fullExtent: {
            top: 6378137 * Math.PI,
            bottom: -6378137 * Math.PI,
            left: -6378137 * Math.PI,
            right: 6378137 * Math.PI,
        },
    },
})
new maptalks.CompassControl({
    position: 'top-right',
}).addTo(map)

const ag = new maptalks.AutoGradual()
const layer = new maptalks.VectorLayer('sketchPad').addTo(map)

// new DrawTool
const drawTool = new maptalks.DrawTool({ mode: 'Polygon' }).addTo(map).disable()
drawTool.on('drawend', (param) => {
    const { geometry } = param
    geometry.addTo(layer)
})

// new Toolbar
const modes = [
    'Point',
    'LineString',
    'Polygon',
    'Rectangle',
    'Circle',
    'Ellipse',
]
let children = []
modes.map((item) =>
    children.push({ item, click: () => drawTool.setMode(item).enable() })
)

const toolbar = new maptalks.control.Toolbar({
    position: 'top-left',
    items: [
        { item: 'Draw', children },
        { item: 'Stop', click: () => drawTool.disable() },
        { item: 'Clear', click: () => layer.clear() },
        { item: 'Gradual Change', click: () => ag.change(layer) },
    ],
}).addTo(map)

// new tip Panel
const textPanel = new maptalks.control.Panel({
    position: 'bottom-left',
    draggable: true,
    custom: false,
    content: `
        Click a type in <b>Draw</b> to draw sth geos,<br />
        and also can draw other type geos if you want.<br />
        Do click <b>Gradual Change</b> to see the effect.<br />
        <br />
        点击<b>Draw</b>里的类型开始画一些相应的图形，<br />
        也可以继续画其他的类型的图形。<br />
        然后点击<b>Gradual Change</b>查看效果。
    `,
    closeButton: true,
})
map.addControl(textPanel)
