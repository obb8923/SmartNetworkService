import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';
const Page13 = () => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [connectionLogs, setConnectionLogs] = useState([]);

  const sendMessage = async () => {
    try {
      // 새로운 WebSocket 연결 생성
      const ws = new WebSocket('ws://localhost:8080');
      
      // 연결 로그 추가
      setConnectionLogs(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        event: '연결됨'
      }]);

      ws.onopen = () => {
        // 메시지 전송
        ws.send(message);
      };

      ws.onmessage = (event) => {
        setReceivedMessages(prev => [...prev, event.data]);
      };

      ws.onclose = () => {
        // 연결 종료 로그 추가
        setConnectionLogs(prev => [...prev, {
          time: new Date().toLocaleTimeString(),
          event: '연결 종료됨'
        }]);
      };

      // 메시지 전송 후 입력창 초기화
      setMessage('');
    } catch (error) {
      console.error('WebSocket 연결 에러:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">13. 단일 메시지 전송 및 연결 관리</h1>

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
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              전송
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2">연결 로그</h2>
            <div className="border border-gray-300 rounded p-4 h-60 overflow-y-auto">
              {connectionLogs.map((log, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                  <span className="text-gray-500">{log.time}</span>: {log.event}
                </div>
              ))}
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
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">단일 메시지 전송 방식</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>연결 방식:</strong>
            <p>메시지 전송마다 새로운 WebSocket 연결을 생성하고 종료합니다.</p>
          </li>
          <li>
            <strong>연결 로깅:</strong>
            <p>모든 연결 시작과 종료가 시간과 함께 기록됩니다.</p>
          </li>
          <li>
            <strong>메시지 관리:</strong>
            <p>각 메시지는 독립적인 연결을 통해 전송되며, 응답도 개별적으로 처리됩니다.</p>
          </li>
        </ul>
      </div>

      <nav>
        <Link to="/12" className="text-blue-500 hover:underline mr-4">이전 페이지로 이동</Link>
        <Link to="/14" className="text-blue-500 hover:underline mr-4">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page13;
