const svgContent =
  '%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20512%20512%22%3E' +
  '%3Cfilter%20id%3D%22grain%22%3E' +
  '%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.75%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E' +
  '%3C%2Ffilter%3E' +
  '%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23grain)%22%20opacity%3D%220.035%22%2F%3E' +
  '%3C%2Fsvg%3E';

const svgData = `data:image/svg+xml,${svgContent}`;

export default function GrainOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        backgroundImage: `url("${svgData}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 200px',
      }}
      aria-hidden="true"
    />
  );
}
