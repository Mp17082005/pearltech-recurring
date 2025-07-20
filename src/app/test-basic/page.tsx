export default function TestPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Test Page</h1>
      <p>If you can see this, the basic Next.js setup is working.</p>
      <p>Date: {new Date().toLocaleDateString()}</p>
    </div>
  );
}
