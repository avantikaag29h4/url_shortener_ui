import { useState, useEffect } from 'react';

const API = 'https://urlshortener-production-7d46.up.railway.app';

function Dashboard({ token, onLogout }) {
  const [longUrl, setLongUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await fetch(`${API}/api/urls`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setUrls(data);
      }
    } catch (err) {
      console.error('Failed to fetch URLs');
    }
  };

  const handleShorten = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API}/api/urls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ originalUrl: longUrl })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      setLongUrl('');
      fetchUrls();
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shortCode) => {
    try {
      await fetch(`${API}/api/urls/${shortCode}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchUrls();
    } catch (err) {
      console.error('Failed to delete');
    }
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied!');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>URL Shortener</h1>
        <button onClick={onLogout} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {/* Shorten Form */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Paste your long URL here"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          style={{ flex: 1, padding: '10px' }}
        />
        <button onClick={handleShorten} disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* URLs Table */}
      {urls.length === 0 ? (
        <p style={{ color: 'gray' }}>No URLs yet. Shorten your first one above!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Original URL</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Short URL</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Clicks</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map(url => (
              <tr key={url.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {url.original_url}
                </td>
                <td style={{ padding: '10px' }}>
                  <a href={`${API}/${url.short_code}`} target="_blank" rel="noreferrer">
                    {url.short_code}
                  </a>
                </td>
                <td style={{ padding: '10px' }}>{url.click_count}</td>
                <td style={{ padding: '10px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleCopy(`${API}/${url.short_code}`)}>
                    Copy
                  </button>
                  <button onClick={() => handleDelete(url.short_code)} style={{ color: 'red' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;