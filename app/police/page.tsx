export default function PolicePage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', backgroundColor: 'rgba(0,0,0,0.8)', padding: '40px', borderRadius: '12px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Los Santos Police Department</h1>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>
          Uphold the law and keep Palmyra safe. Join our police department and make a difference in the community.
        </p>
        <a 
          href="https://tally.so/r/wMWLEg" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            width: '100%'
          }}
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}
