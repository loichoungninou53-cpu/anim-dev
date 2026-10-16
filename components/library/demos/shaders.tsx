"use client"

import { useEffect, useRef, useState } from "react";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }`

const FRAG = `
precision mediump float;
uniform vec2 r; uniform float t;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
void main(){
  vec2 uv = gl_FragCoord.xy / r.xy;
  float q = n(uv*3.0 + vec2(t*0.05, -t*0.03));
  float w = n(uv*5.0 - vec2(t*0.04, t*0.02) + q*2.0);
  vec3 a = vec3(0.89,0.16,0.12), b = vec3(1.0,0.54,0.42), c = vec3(1.0,0.97,0.96);
  vec3 col = mix(c, a, smoothstep(0.2, 0.9, w));
  col = mix(col, b, smoothstep(0.4, 0.7, q) * 0.6);
  gl_FragColor = vec4(col, 1.0);
}`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
}

export function ShadersDemo() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [ok, setOk] = useState(true)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext("webgl")
    if (!gl) { setOk(false); return }
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) { setOk(false); return }
    const prog = gl.createProgram()
    if (!prog) { setOk(false); return }
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    gl.useProgram(prog)
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, "p")
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uR = gl.getUniformLocation(prog, "r")
    const uT = gl.getUniformLocation(prog, "t")

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(canvas.clientWidth * dpr)
      canvas.height = Math.floor(canvas.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    const start = performance.now()
    const draw = (now: number) => {
      gl.uniform2f(uR, canvas.width, canvas.height)
      gl.uniform1f(uT, still ? 0 : (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!still) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [])

  return (
    <div className="relative h-56 overflow-hidden rounded-2xl border border-primary/15">
      {ok ? (
        <canvas ref={ref} className="absolute inset-0 h-full w-full" role="img" aria-label="Fond animé exemple (shader WebGL)" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-primary/30 to-white text-sm">WebGL indisponible : fond statique de repli.</div>
      )}
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">Shader exemple</p>
    </div>
  )
}
