const map = new maptalks.Map('map', {
    center: [121.387, 31.129],
    zoom: 14,
    baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'https://webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
        subdomains: ['01', '02', '03', '04'],
        maxAvailableZoom: 18,
        placeholder: true
    })
})

const ag = new maptalks.AutoGradual()
const layer = new maptalks.VectorLayer('sketchPad').addTo(map)

// new drawtool
const drawTool = new maptalks.DrawTool({ mode: 'Polygon' }).addTo(map).disable()
drawTool.on('drawend', (param) => {
    const { geometry } = param
    geometry.addTo(layer)
})

//new toolbar
const modes = ['Point', 'LineString', 'Polygon', 'Rectangle', 'Circle', 'Ellipse']
let children = []
modes.map((item) =>
    children.push({
        item,
        click: () => drawTool.setMode(item).enable()
    })
)

const toolbar = new maptalks.control.Toolbar({
    items: [
        {
            item: 'Draw',
            children
        },
        {
            item: 'Stop',
            click: () => drawTool.disable()
        },
        {
            item: 'Clear',
            click: () => layer.clear()
        },
        {
            item: 'Gradual Change',
            click: () => ag.change(layer)
        }
    ]
}).addTo(map)

//tip panel
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
    closeButton: true
})
map.addControl(textPanel)
