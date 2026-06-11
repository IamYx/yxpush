/**
 * Vercel Serverless Function - 云信 API 代理
 * 自动处理 CORS 和 SHA1 签名
 */

const crypto = require('crypto');

const YUNXIN_ENDPOINT = 'https://api.netease.im';

function sha1(message) {
  return crypto.createHash('sha1').update(message, 'utf8').digest('hex');
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-App-Key, X-App-Secret');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const appKey = req.headers['x-app-key'];
  const appSecret = req.headers['x-app-secret'];

  if (!appKey || !appSecret) {
    res.status(400).json({ error: 'Missing X-App-Key or X-App-Secret header' });
    return;
  }

  // 解析路径：/api/proxy/im/v2/user_tags → /im/v2/user_tags
  let apiPath = req.url.replace(/^\/api\/proxy/, '');
  if (!apiPath.startsWith('/')) apiPath = '/' + apiPath;

  // 生成 CheckSum
  const nonce = Math.random().toString(36).substring(2, 15);
  const curTime = Math.floor(Date.now() / 1000).toString();
  const checkSum = sha1(appSecret + nonce + curTime);

  const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    'AppKey': appKey,
    'Nonce': nonce,
    'CurTime': curTime,
    'CheckSum': checkSum,
  };

  try {
    const response = await fetch(YUNXIN_ENDPOINT + apiPath, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    res.status(response.status).setHeader('Content-Type', 'application/json').send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
