import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';

const Page10 = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    // WebSocket 연결
    wsRef.current = new WebSocket('ws://localhost:8080');
    
    wsRef.current.onopen = () => {
      console.log('WebSocket 연결 성공');
      setConnected(true);
    };

    wsRef.current.onmessage = (event) => {
      console.log('수신된 메시지:', event.data);
      setReceivedMessages(prev => [...prev, event.data]);
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket 연결 종료');
      setConnected(false);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        console.log('WebSocket 연결 종료');
      }
    };
  }, []);

  const sendFixedLengthMessage = () => {
    if (!wsRef.current || !connected) return;

    // 메시지를 50바이트 고정 길이로 만들기
    let fixedMessage = message.padEnd(50, ' ');
    if (fixedMessage.length > 50) {
      fixedMessage = fixedMessage.substring(0, 50);
    }

    wsRef.current.send(fixedMessage);
    setMessage('');
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">10. 고정 길이 데이터 전송</h1>

      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">메시지 전송</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={50}
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              placeholder="메시지를 입력하세요 (최대 50바이트)"
            />
            <button
              onClick={sendFixedLengthMessage}
              disabled={!connected}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              전송
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            현재 메시지 길이: {message.length}/50 바이트
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
        <h2 className="text-xl font-bold mb-4">고정 길이 데이터 전송 방식</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>고정 길이:</strong>
            <p>모든 메시지는 50바이트로 고정되어 전송됩니다.</p>
          </li>
          <li>
            <strong>패딩 처리:</strong>
            <p>50바이트보다 짧은 메시지는 공백으로 패딩됩니다.</p>
          </li>
          <li>
            <strong>길이 제한:</strong>
            <p>50바이트를 초과하는 메시지는 자동으로 잘립니다.</p>
          </li>
        </ul>
      </div>

      <nav>
        <Link to="/9" className="text-blue-500 hover:underline mr-4">이전 페이지로 이동</Link>
        <Link to="/11" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page10;
