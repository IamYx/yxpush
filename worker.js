/**
 * Cloudflare Worker - 云信 API 代理
 * 
 * 部署方式：
 * 1. 登录 https://dash.cloudflare.com
 * 2. Workers & Pages -> Create -> Create Worker
 * 3. 粘贴此代码 -> Deploy
 * 4. 复制 Worker URL，填入前端页面的"代理地址"
 */

const YUNXIN_ENDPOINT = 'https://api.netease.im';

async function sha1(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-App-Key, X-App-Secret',
  'Access-Control-Max-Age': '86400',
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // CORS 预检
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 解析路径：去掉开头的 /proxy
    let apiPath = url.pathname.replace(/^\/proxy/, '');
    if (!apiPath.startsWith('/')) apiPath = '/' + apiPath;
    if (url.search) apiPath += url.search;

    // 读取前端传来的 AppKey 和 AppSecret
    const appKey = request.headers.get('X-App-Key');
    const appSecret = request.headers.get('X-App-Secret');

    if (!appKey || !appSecret) {
      return new Response(JSON.stringify({ error: 'Missing X-App-Key or X-App-Secret header' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // 生成 CheckSum
    const nonce = Math.random().toString(36).substring(2, 15);
    const curTime = Math.floor(Date.now() / 1000).toString();
    const checkSum = await sha1(appSecret + nonce + curTime);

    // 构建转发请求
    const targetUrl = YUNXIN_ENDPOINT + apiPath;
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'AppKey': appKey,
      'Nonce': nonce,
      'CurTime': curTime,
      'CheckSum': checkSum,
    };

    const init = {
      method: request.method,
      headers: headers,
    };

    // GET 请求不转发 body
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      init.body = await request.text();
    }

    try {
      const response = await fetch(targetUrl, init);
      const data = await response.text();

      return new Response(data, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          ...corsHeaders,
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};
