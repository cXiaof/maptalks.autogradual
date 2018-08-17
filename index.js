import hexRgb from 'hex-rgb'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'

const options = {
    colors: ['rgb(18,194,233)', 'rgb(196,113,237)', 'rgb(246,79,105)'],
    direction: 'y',
    includePolygonBorder: false
}

export class AutoGradual extends maptalks.Class {
    constructor(options) {
        super(options)
    }

    change(target) {
        let geometries = []
        if (target instanceof maptalks.VectorLayer) geometries = layer.getGeometries()
        else if (target instanceof Array) geometries = target
        this.geometries = this._sortGeosByExtent(geometries)
        this._length = this.geometries.length
        if (this._length > 0) this._doRadualChange()
        delete this.geometries
        delete this._length
        delete this._level
    }

    _sortGeosByExtent(geos) {
        let obj = []
        const directionX = this.options['direction'].toLowerCase() === 'x'
        const directionY = this.options['direction'].toLowerCase() === 'y'
        if (!directionX && !directionY) return geos
        geos.forEach((geo) => {
            const { xmin, ymax } = geo.getExtent()
            const sortKey = directionY ? ymax : xmin
            obj.push({ sortKey, geo })
        })
        let sortResult = sortBy(obj, 'sortKey')
        if (directionY) sortResult = reverse(sortResult)
        let sortGeos = []
        sortResult.forEach((item) => sortGeos.push(item.geo))
        return sortGeos
    }

    _doRadualChange() {
        const target = this.options['colors']
        const { length } = target
        this._level = length - 1
        if (this._length >= length) {
            let gaps = []
            for (let i = 0; i < this._level; i++) {
                gaps.push(i * parseInt(this._length / this._level, 0))
            }
            const tasks = this._getTasksIndexArrBygap(gaps)
            tasks.forEach((task, index) => {
                const colorArr = this._getItemsColor(target[index], target[index + 1], task.length)
                task.forEach((key, i) => this._updateGeosSymbol(this.geometries[key], colorArr[i]))
            })
        } else
            this.geometries.forEach((geo, index) =>
                this._updateGeosSymbol(geo, this.options['colors'][index])
            )
    }

    _getTasksIndexArrBygap(gaps) {
        const length = this._length
        let children = []
        let child = []
        for (let i = 0; i < length; i++) {
            if (gaps.indexOf(i) > 0) {
                children.push(child)
                child = []
            }
            child.push(i)
            if (i === length - 1) children.push(child)
        }
        return children
    }

    _updateGeosSymbol(geo, color) {
        const type = geo.getType()
        let symbol = {}
        if (type.includes('Point')) symbol.markerFill = color
        if (type.includes('Line')) symbol.lineColor = color
        if (type.includes('Polygon')) {
            symbol.polygonFill = color
            if (this.options['includePolygonBorder']) symbol.lineColor = color
        }
        geo.updateSymbol(symbol)
    }

    _getItemsColor(colorStart, colorEnd, level) {
        colorStart = this._getColorValueArr(colorStart)
        colorEnd = this._getColorValueArr(colorEnd)
        let arr = []
        let [sR, sG, sB] = colorStart
        let [eR, eG, eB] = colorEnd

        const perR = (eR - sR) / level
        const perG = (eG - sG) / level
        const perB = (eB - sB) / level

        for (let i = 0; i <= level; i++) {
            const r = parseInt(perR * i + sR, 0)
            const g = parseInt(perG * i + sG, 0)
            const b = parseInt(perB * i + sB, 0)
            arr.push(`rgb(${r},${g},${b})`)
        }
        return arr
    }

    _getColorValueArr(color) {
        let arr = []
        try {
            arr = hexRgb(color, { format: 'array' })
        } catch (e) {
            color = color.replace(/\s+/g, '')
            color = color.substr(4)
            color = color.substr(0, color.length - 1)
            color.split(',').forEach((item) => arr.push(parseInt(item, 0)))
        }
        return arr
    }
}

AutoGradual.mergeOptions(options)
