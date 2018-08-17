# maptalks.autogradual

A tool to update geometries symbol with gradual change color.

## Examples

### [DEMO](https://cxiaof.github.io/maptalks.autogradual/demo/index.html)

## Install

-   Install with npm: `npm install maptalks.autogradual`.
-   Download from [dist directory](https://github.com/cXiaof/maptalks.autogradual/tree/master/dist).
-   Use unpkg CDN: `https://unpkg.com/maptalks.autogradual/dist/maptalks.autogradual.min.js`

## Usage

As a plugin, `maptalks.autogradual` must be loaded after `maptalks.js` in browsers. You can also use `'import { AutoGradual } from "maptalks.autogradual"` when developing with webpack.

```html
<script type="text/javascript" src="https://unpkg.com/maptalks/dist/maptalks.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/maptalks.autogradual/dist/maptalks.autogradual.min.js"></script>
<script>
    const autogradual = new maptalks.AutoGradual()
    autogradual.change(layer)
    // autogradual.change(geos)
</script>
```

## API Reference

```javascript
new maptalks.AutoGradual()
```

-   options
    -   colors **Array** gradual color array
    -   direction **String** 'x' / 'y' / null
    -   includePolygonBorder **Boolean** false is default

`change(attr)` // attr can be a VectorLayer or geos-array

## Contributing

We welcome any kind of contributions including issue reportings, pull requests, documentation corrections, feature requests and any other helps.

## Develop

The only source file is `index.js`.

It is written in ES6, transpiled by [babel](https://babeljs.io/) and tested with [mocha](https://mochajs.org) and [expect.js](https://github.com/Automattic/expect.js).

### Scripts

-   Install dependencies

```shell
$ npm install
```

-   Watch source changes and generate runnable bundle repeatedly

```shell
$ gulp watch
```

-   Tests

```shell
$ npm test
```

-   Watch source changes and run tests repeatedly

```shell
$ gulp tdd
```

-   Package and generate minified bundles to dist directory

```shell
$ gulp minify
```

-   Lint

```shell
$ npm run lint
```

## More Things

-   [maptalks.autoadsorb](https://github.com/cXiaof/maptalks.autoadsorb/issues)
-   [maptalks.multisuite](https://github.com/cXiaof/maptalks.multisuite/issues)
-   [maptalks.geosplit](https://github.com/cXiaof/maptalks.geosplit/issues)
-   [maptalks.polygonbool](https://github.com/cXiaof/maptalks.polygonbool/issues)
-   [maptalks.autogradual](https://github.com/cXiaof/maptalks.autogradual/issues)
-   [maptalks.control.compass](https://github.com/cXiaof/maptalks.control.compass/issues)
-   [maptalks.autogradual](https://github.com/cXiaof/maptalks.autogradual/issues)
