const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
  console.log('클라이언트 연결됨');

  ws.on('message', (message) => {
    console.log('수신된 메시지:', message);
    ws.send(`서버로부터 에코: ${message}`);
  });

  ws.on('close', () => {
    console.log('클라이언트 연결 종료');
  });
});

console.log('WebSocket 서버가 8080 포트에서 실행 중입니다.');
