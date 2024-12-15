import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';
const Page11 = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:8080');
    
    wsRef.current.onopen = () => {
      setConnected(true);
    };

    wsRef.current.onmessage = (event) => {
      setReceivedMessages(prev => [...prev, event.data]);
    };

    wsRef.current.onclose = () => {
      setConnected(false);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const sendVariableLengthMessage = () => {
    if (!wsRef.current || !connected) return;

    // 메시지 길이를 4바이트 헤더로 추가
    const messageBytes = new TextEncoder().encode(message);
    const lengthBytes = new Uint32Array([messageBytes.length]);
    
    // 헤더와 메시지를 합친 새로운 ArrayBuffer 생성
    const buffer = new ArrayBuffer(4 + messageBytes.length);
    new Uint8Array(buffer).set(new Uint8Array(lengthBytes.buffer), 0);
    new Uint8Array(buffer).set(messageBytes, 4);

    wsRef.current.send(buffer);
    setMessage('');
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">11. 가변 길이 데이터 전송</h1>

      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">메시지 전송</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              placeholder="메시지를 입력하세요"
            />
            <button
              onClick={sendVariableLengthMessage}
              disabled={!connected}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              전송
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            현재 메시지 길이: {message.length} 바이트
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">수신된 메시지</h2>
          <div className="border border-gray-300 rounded p-4 h-60 overflow-y-auto">
            {receivedMessages.map((msg, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                {msg}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">가변 길이 데이터 전송 방식</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>길이 헤더:</strong>
            <p>메시지 앞에 4바이트 길이 정보가 포함됩니다.</p>
          </li>
          <li>
            <strong>가변 길이:</strong>
            <p>메시지의 길이에 제한이 없으며, 실제 데이터 길이만큼만 전송됩니다.</p>
          </li>
          <li>
            <strong>효율성:</strong>
            <p>불필요한 패딩 없이 필요한 만큼의 데이터만 전송되어 효율적입니다.</p>
          </li>
        </ul>
      </div>

      <nav>
        <Link to="/10" className="text-blue-500 hover:underline mr-4">이전 페이지로 이동</Link>
        <Link to="/12" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page11;
