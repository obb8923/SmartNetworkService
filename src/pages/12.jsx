import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';

const Page12 = () => {
  const [message, setMessage] = useState('');
  const [fixedMessage, setFixedMessage] = useState('');
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

  const sendCombinedMessage = () => {
    if (!wsRef.current || !connected) return;

    // 고정 길이 부분 (20바이트)
    let fixedPart = fixedMessage.padEnd(20, ' ');
    if (fixedPart.length > 20) {
      fixedPart = fixedPart.substring(0, 20);
    }

    // 가변 길이 부분
    const variablePart = message;
    const variableLength = new TextEncoder().encode(variablePart).length;
    
    // 길이 정보 (4바이트) + 고정 길이 데이터 (20바이트) + 가변 길이 데이터
    const combinedMessage = {
      fixedPart,
      variablePart,
      variableLength
    };

    wsRef.current.send(JSON.stringify(combinedMessage));
    setMessage('');
    setFixedMessage('');
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">12. 혼합 데이터 전송</h1>

      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">메시지 전송</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                고정 길이 메시지 (20바이트)
              </label>
              <input
                type="text"
                value={fixedMessage}
                onChange={(e) => setFixedMessage(e.target.value)}
                maxLength={20}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="고정 길이 메시지 입력"
              />
              <p className="text-sm text-gray-600 mt-1">
                현재 길이: {fixedMessage.length}/20 바이트
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                가변 길이 메시지
              </label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="가변 길이 메시지 입력"
              />
              <p className="text-sm text-gray-600 mt-1">
                현재 길이: {new TextEncoder().encode(message).length} 바이트
              </p>
            </div>

            <button
              onClick={sendCombinedMessage}
              disabled={!connected}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              전송
            </button>
          </div>
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
        <h2 className="text-xl font-bold mb-4">혼합 데이터 전송 방식</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>고정 길이 부분:</strong>
            <p>첫 20바이트는 고정 길이로 처리됩니다.</p>
          </li>
          <li>
            <strong>가변 길이 부분:</strong>
            <p>나머지 데이터는 가변 길이로 처리되며, 길이 정보가 포함됩니다.</p>
          </li>
          <li>
            <strong>데이터 구조:</strong>
            <p>길이 정보(4바이트) + 고정 길이 데이터(20바이트) + 가변 길이 데이터</p>
          </li>
        </ul>
      </div>

      <nav>
        <Link to="/11" className="text-blue-500 hover:underline mr-4">이전 페이지로 이동</Link>
        <Link to="/13" className="text-blue-500 hover:underline mr-4">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page12;
