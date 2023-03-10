var xtend = require('xtend')
var number = require('as-number')

module.exports = function(THREE) {
    return function (opt) {
        opt = opt||{}

        var ret = xtend({
            uniforms: {
                thickness: { type: 'f', value: number(opt.thickness, 0.1) },
                opacity: { type: 'f', value: number(opt.opacity, 1.0) },
                diffuse: { type: 'c', value: new THREE.Color(opt.diffuse) }
            },
            attributes: {
                lineMiter:  { type: 'f', value: 0 },
                lineNormal: { type: 'v2', value: new THREE.Vector2() }
            },
            vertexShader: [
                "uniform float thickness;",
                "attribute float lineMiter;",
                "attribute vec2 lineNormal;",
                "void main() {",
                    "vec3 pointPos = position.xyz + vec3(lineNormal * thickness/2.0 * max(min(lineMiter,1.0), -1.0), 0.0);",
                    "gl_Position = projectionMatrix * modelViewMatrix * vec4( pointPos, 1.0 );",
                "}"
            ].join("\n"),
            fragmentShader: [   
                "uniform float opacity;",
                "uniform vec3 diffuse;",
                "void main() {",
                    "gl_FragColor = vec4(diffuse, opacity);",
                "}"
            ].join("\n")
        }, opt)
        return ret
    }
}