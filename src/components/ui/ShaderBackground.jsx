import { useEffect, useRef } from 'react'

const VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

// Aurora con ruido simplex y deformación de dominio. Los colores salen de
// las variables CSS del tema, así que cambia sola entre claro y oscuro.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uBg;
uniform float uStrength;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  float t = uTime * 0.07;

  vec2 q = vec2(snoise(p * 0.9 + vec2(t, -t * 0.6)), snoise(p * 0.9 + vec2(-t * 0.8, t * 0.5) + 4.2));
  float n = snoise(p * 1.4 + q * 1.1 + vec2(0.0, t * 0.8));
  float n2 = snoise(p * 2.6 - q * 0.8 - t);

  float curve = 0.62 + 0.16 * q.x + 0.06 * sin(p.x * 2.2 + t * 4.0);
  float band = exp(-pow((uv.y - curve) * 3.2, 2.0));
  float band2 = exp(-pow((uv.y - curve + 0.28 + 0.1 * q.y) * 4.5, 2.0)) * 0.6;

  vec3 col = mix(uC1, uC2, smoothstep(-0.7, 0.7, n));
  col = mix(col, uC3, smoothstep(-0.3, 0.9, n2) * 0.75);

  float mouse = exp(-pow(distance(p, m) * 2.4, 2.0));
  float glow = (band + band2) * (0.65 + 0.35 * n) + mouse * 0.45;
  glow = clamp(glow, 0.0, 1.0) * uStrength;

  vec3 c = mix(uBg, col, glow);
  c = mix(uBg, c, smoothstep(0.0, 0.45, uv.y));
  gl_FragColor = vec4(c, 1.0);
}
`

const hexToRgb = (value) => {
  const v = value.trim()
  if (v.startsWith('#')) {
    const h = v.length === 4 ? v.slice(1).replace(/./g, (c) => c + c) : v.slice(1, 7)
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
  }
  const nums = v.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0]
  return nums.slice(0, 3).map((n) => n / 255)
}

export default function ShaderBackground({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const program = gl.createProgram()
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.style.display = 'none'
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const u = (name) => gl.getUniformLocation(program, name)
    const uni = {
      res: u('uRes'),
      time: u('uTime'),
      mouse: u('uMouse'),
      c1: u('uC1'),
      c2: u('uC2'),
      c3: u('uC3'),
      bg: u('uBg'),
      strength: u('uStrength'),
    }

    const applyColors = () => {
      const css = getComputedStyle(document.documentElement)
      const dark = document.documentElement.classList.contains('dark')
      gl.uniform3fv(uni.c1, hexToRgb(css.getPropertyValue('--accent')))
      gl.uniform3fv(uni.c2, hexToRgb(css.getPropertyValue('--accent-2')))
      gl.uniform3fv(uni.c3, hexToRgb(css.getPropertyValue('--accent-3')))
      gl.uniform3fv(uni.bg, hexToRgb(css.getPropertyValue('--bg')))
      gl.uniform1f(uni.strength, dark ? 0.6 : 0.38)
    }
    applyColors()
    const themeObserver = new MutationObserver(applyColors)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // Se renderiza a media resolución: la aurora es suave y así rinde en móviles.
    const scale = 0.5
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale))
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale))
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(uni.res, w, h)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const mouse = { x: 0.7, y: 0.6, tx: 0.7, ty: 0.6 }
    const onPointer = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.tx = (e.clientX - r.left) / r.width
      mouse.ty = 1 - (e.clientY - r.top) / r.height
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let visible = true
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
    })
    io.observe(canvas)

    let raf = 0
    const start = performance.now()
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (!visible || document.hidden) return
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      gl.uniform2f(uni.mouse, mouse.x, mouse.y)
      gl.uniform1f(uni.time, reduce ? 12 : (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onPointer)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={`h-full w-full ${className}`} />
}
