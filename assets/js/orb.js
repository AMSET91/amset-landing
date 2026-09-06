// Puerto a JS vanilla del AssistantOrb.jsx real (tradingFront-main/components/assistant/orb/AssistantOrb.jsx).
// Misma geometria SVG exacta (dial tipo reactor: bisel de marcas, anillo punteado,
// arco de nivel, nucleo con glow) - aqui solo en estado "idle", decorativo, sin
// estado de voz que renderizar.

(function () {
  const CX = 100;
  const CY = 100;
  const COLOR = '#00d4ff';
  const SPEED = 1;
  const LEVEL = 0.42;
  const RING_R = 68;
  const RING_CIRC = 2 * Math.PI * RING_R;

  function polar(cx, cy, r, angleDeg) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  }

  function svgEl(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs || {}).forEach((k) => el.setAttribute(k, attrs[k]));
    return el;
  }

  function buildOrb(mount) {
    const size = mount.getAttribute('data-size') || 340;
    mount.style.position = 'relative';
    mount.style.width = size + 'px';
    mount.style.maxWidth = '100%';
    mount.style.aspectRatio = '1 / 1';
    mount.style.height = 'auto';

    const glow = document.createElement('div');
    glow.style.cssText = `position:absolute;inset:-10%;border-radius:50%;pointer-events:none;filter:blur(24px);background:radial-gradient(circle, ${COLOR}40 0%, transparent 65%);`;
    mount.appendChild(glow);

    const svg = svgEl('svg', { viewBox: '0 0 200 200', style: 'width:100%;height:100%;position:relative;overflow:visible' });

    const defs = svgEl('defs', {});
    const grad = svgEl('radialGradient', { id: 'amsetCoreGlow', cx: '50%', cy: '50%', r: '50%' });
    grad.appendChild(svgEl('stop', { offset: '0%', 'stop-color': COLOR, 'stop-opacity': '0.95' }));
    grad.appendChild(svgEl('stop', { offset: '55%', 'stop-color': COLOR, 'stop-opacity': '0.22' }));
    grad.appendChild(svgEl('stop', { offset: '100%', 'stop-color': COLOR, 'stop-opacity': '0' }));
    defs.appendChild(grad);
    svg.appendChild(defs);

    // Bisel exterior con marcas tipo reloj/radar
    const ticksGroup = svgEl('g', { style: `transform-origin:100px 100px;animation:amset-orb-spin ${20 / SPEED}s linear infinite` });
    for (let i = 0; i < 60; i++) {
      const angle = i * 6;
      const major = i % 5 === 0;
      const rInner = major ? 84 : 89;
      const [x1, y1] = polar(CX, CY, rInner, angle);
      const [x2, y2] = polar(CX, CY, 96, angle);
      ticksGroup.appendChild(
        svgEl('line', {
          x1, y1, x2, y2,
          stroke: COLOR,
          'stroke-width': major ? 1.6 : 0.8,
          'stroke-opacity': major ? 0.85 : 0.35,
          'stroke-linecap': 'round',
        })
      );
    }
    svg.appendChild(ticksGroup);

    // Anillo punteado - efecto "escaneando"
    const dashRing = svgEl('circle', {
      cx: CX, cy: CY, r: 78, fill: 'none', stroke: COLOR, 'stroke-opacity': 0.4,
      'stroke-width': 1.5, 'stroke-dasharray': '2 5',
    });
    dashRing.appendChild(
      svgEl('animateTransform', {
        attributeName: 'transform', type: 'rotate', from: '0 100 100', to: '360 100 100',
        dur: `${14 / SPEED}s`, repeatCount: 'indefinite',
      })
    );
    svg.appendChild(dashRing);

    // Arco de nivel, gira al reves
    const levelLen = RING_CIRC * LEVEL;
    const levelGroup = svgEl('g', { style: `transform-origin:100px 100px;animation:amset-orb-spin-reverse ${11 / SPEED}s linear infinite` });
    levelGroup.appendChild(
      svgEl('circle', {
        cx: CX, cy: CY, r: RING_R, fill: 'none', stroke: COLOR, 'stroke-width': 4.5,
        'stroke-linecap': 'round', 'stroke-dasharray': `${levelLen} ${RING_CIRC - levelLen}`,
      })
    );
    levelGroup.appendChild(svgEl('circle', { cx: CX, cy: CY, r: RING_R, fill: 'none', stroke: COLOR, 'stroke-opacity': 0.15, 'stroke-width': 1 }));
    svg.appendChild(levelGroup);

    // Anillo interior fino
    svg.appendChild(svgEl('circle', { cx: CX, cy: CY, r: 52, fill: 'none', stroke: COLOR, 'stroke-opacity': 0.3, 'stroke-width': 1 }));

    // Nucleo con glow
    svg.appendChild(svgEl('circle', { cx: CX, cy: CY, r: 46, fill: 'url(#amsetCoreGlow)' }));
    const core = svgEl('circle', { cx: CX, cy: CY, r: 5, fill: COLOR });
    core.appendChild(svgEl('animate', { attributeName: 'r', values: '4;8;4', dur: `${2.4 / SPEED}s`, repeatCount: 'indefinite' }));
    core.appendChild(svgEl('animate', { attributeName: 'opacity', values: '1;0.6;1', dur: `${2.4 / SPEED}s`, repeatCount: 'indefinite' }));
    svg.appendChild(core);

    mount.appendChild(svg);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes amset-orb-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes amset-orb-spin-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('[data-amset-orb]').forEach(buildOrb);
})();
