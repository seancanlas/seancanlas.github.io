// Vertex Shader for Particle Field
export const particleVert = `
  attribute float size;
  attribute vec3 customColor;
  attribute float opacity;
  varying vec3 vColor;
  varying float vOpacity;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;

  // Simplex noise for organic movement
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vColor = customColor;
    vOpacity = opacity;

    vec3 pos = position;
    
    // Organic floating motion
    float noise = snoise(pos * 0.5 + uTime * 0.15);
    pos.x += sin(uTime * 0.3 + position.y * 0.5) * 0.3;
    pos.y += cos(uTime * 0.2 + position.x * 0.3) * 0.2;
    pos.z += noise * 0.15;

    // Subtle rotation around Y axis
    float angle = uTime * 0.05;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    pos.xz = rot * pos.xz;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * uPixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

// Fragment Shader for Particle Field
export const particleFrag = `
  varying vec3 vColor;
  varying float vOpacity;
  uniform vec3 uGlowColor;
  uniform float uGlowIntensity;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    
    // Soft glow at center
    float glow = 1.0 - smoothstep(0.0, 0.4, dist);
    
    vec3 color = mix(vColor, uGlowColor, glow * uGlowIntensity);
    float finalAlpha = alpha * vOpacity * (0.6 + glow * 0.4);
    
    gl_FragColor = vec4(color, finalAlpha);
  }
`

// Vertex Shader for Skill Orbs
export const orbVert = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Fragment Shader for Skill Orbs (Glass/Crystal Material)
export const orbFrag = `
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  uniform vec3 uBaseColor;
  uniform vec3 uGlowColor;
  uniform float uGlowIntensity;
  uniform float uTime;
  uniform float uHover;
  uniform vec3 uCameraPosition;

  void main() {
    vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
    
    // Base glass color
    vec3 color = uBaseColor * 0.3;
    
    // Fresnel rim glow
    color += uGlowColor * fresnel * (0.5 + uHover * 1.5);
    
    // Subtle animated caustics
    float caustic = sin(vWorldPosition.x * 5.0 + uTime * 2.0) * 
                    cos(vWorldPosition.z * 5.0 + uTime * 1.5) * 0.05;
    color += uGlowColor * caustic * uHover;
    
    // Inner glow when hovered
    float innerGlow = uHover * 0.3;
    color += uBaseColor * innerGlow;
    
    // Alpha for glass effect
    float alpha = 0.15 + fresnel * 0.4 + uHover * 0.3;
    
    gl_FragColor = vec4(color, alpha);
  }
`