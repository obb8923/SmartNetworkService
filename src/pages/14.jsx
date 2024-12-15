import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';

const Page14 = () => {
  const [clients, setClients] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInputs, setMessageInputs] = useState({});
  const wsRefs = useRef({});
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];

  const createNewClient = () => {
    const newClient = {
      id: Date.now(),
      color: colors[clients.length % colors.length],
      connectedAt: new Date().toLocaleTimeString()
    };

    // 새로운 WebSocket 연결 생성
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onopen = () => {
      addMessage(`클라이언트 ${newClient.id}: 서버에 연결되었습니다.`, newClient.color);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
          addMessage(`클라이언트 ${data.clientId}: ${data.content}`, newClient.color);
        }
      } catch (error) {
        console.error("Received non-JSON message:", event.data);
        // JSON 형식이 아닌 메시지를 처리하는 로직 추가
        addMessage(`서버로부터 에코: ${event.data}`, newClient.color);
      }
    };

    ws.onclose = () => {
      addMessage(`클라이언트 ${newClient.id}: 서버와의 연결이 종료되었습니다.`, newClient.color);
    };

    wsRefs.current[newClient.id] = ws;
    setClients(prev => [...prev, newClient]);
    setMessageInputs(prev => ({...prev, [newClient.id]: ''}));
  };

  const addMessage = (msg, color) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      content: msg,
      timestamp: new Date().toLocaleTimeString(),
      color: color
    }]);
  };

  const sendMessage = (clientId) => {
    const ws = wsRefs.current[clientId];
    const message = messageInputs[clientId];
    const client = clients.find(c => c.id === clientId);

    if (!ws || !message) return;

    ws.send(JSON.stringify({
      type: 'message',
      clientId: clientId,
      content: message
    }));

    addMessage(`클라이언트 ${clientId}: ${message}`, client.color);
    setMessageInputs(prev => ({...prev, [clientId]: ''}));
  };

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 모든 웹소켓 연결 종료
      Object.values(wsRefs.current).forEach(ws => ws.close());
    };
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">14. 멀티스레드 TCP 서버 테스트</h1>

      <button 
        onClick={createNewClient}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        새 클라이언트 생성
      </button>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">연결된 클라이언트</h2>
          <div className="space-y-4">
            {clients.map(client => (
              <div 
                key={client.id}
                className="p-4 rounded"
                style={{backgroundColor: `${client.color}15`}}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-bold" style={{color: client.color}}>
                      클라이언트 ID: {client.id}
                    </span>
                    <div className="text-sm text-gray-600">
                      연결 시간: {client.connectedAt}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageInputs[client.id] || ''}
                    onChange={(e) => setMessageInputs(prev => ({
                      ...prev,
                      [client.id]: e.target.value
                    }))}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    placeholder="메시지 입력"
                  />
                  <button
                    onClick={() => sendMessage(client.id)}
                    className="px-4 py-2 rounded text-white"
                    style={{backgroundColor: client.color}}
                  >
                    전송
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">메시지 로그</h2>
          <div className="border border-gray-300 rounded p-4 h-[600px] overflow-y-auto">
            {messages.map(msg => (
              <div 
                key={msg.id} 
                className="mb-2 p-2 rounded"
                style={{backgroundColor: `${msg.color}15`}}
              >
                <span className="text-gray-500 text-sm">{msg.timestamp}</span>
                <div style={{color: msg.color}}>{msg.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">멀티스레드 TCP 서버 특징</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>동시 접속:</strong>
            <p>여러 클라이언트가 동시에 접속하여 통신할 수 있습니다.</p>
          </li>
          <li>
            <strong>독립적인 처리:</strong>
            <p>각 클라이언트는 독립된 스레드에서 처리되어 서로 영향을 주지 않습니다.</p>
          </li>
          <li>
            <strong>실시간 통신:</strong>
            <p>클라이언트 간 실시간 메시지 교환이 가능합니다.</p>
          </li>
        </ul>
      </div>

      <nav>
        <Link to="/13" className="text-blue-500 hover:underline mr-4">이전 페이지로 이동</Link>
        <Link to="/15" className="text-blue-500 hover:underline mr-4">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page14;
