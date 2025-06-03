addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  const PASSWORD = 'your-password';
  const clipboard = [];
  
  async function handleRequest(request) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method === 'POST') {
      const body = await request.json();
      if (body.password !== PASSWORD) {
        return new Response('Unauthorized', { status: 401 });
      }
      const item = {
        title: body.title || '',
        type: body.type || 'text',
        content: body.content || '',
        timestamp: Date.now()
      };
      clipboard.unshift(item);
      return new Response(JSON.stringify({ status: 'ok' }), { headers: corsHeaders });
    }
    if (request.method === 'GET') {
      const auth = url.searchParams.get('password');
      if (auth !== PASSWORD) {
        return new Response('Unauthorized', { status: 401 });
      }
      return new Response(JSON.stringify(clipboard), { headers: corsHeaders });
    }
    return new Response('Not found', { status: 404 });
  }
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  