export default function TestPage() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
      <h1>Test Page - Palmyra RP</h1>
      <p>If you can see this, the deployment is working!</p>
      <p>Environment check:</p>
      <ul>
        <li>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing'}</li>
        <li>SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'}</li>
      </ul>
    </div>
  );
}
