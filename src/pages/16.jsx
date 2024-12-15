import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';

const Page16 = () => {
  const [buffer, setBuffer] = useState('');
  const [logs, setLogs] = useState([]);
  const [writeEvent, setWriteEvent] = useState(false);
  const [readEvent, setReadEvent] = useState(false);

  const writeToBuffer = () => {
    const data = `데이터 ${Date.now()}`;
    setBuffer(data);
    setWriteEvent(true);
    setReadEvent(false);
    addLog(`스레드 1: 버퍼에 "${data}" 쓰기 완료`);
  };

  const readFromBuffer = (threadId) => {
    if (writeEvent && !readEvent) {
      setReadEvent(true);
      setWriteEvent(false);
      addLog(`스레드 ${threadId}: 버퍼에서 "${buffer}" 읽기 완료`);
    }
  };

  const addLog = (message) => {
    setLogs(prev => [...prev, {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">16. 이벤트 연습</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">버퍼 상태</h2>
          <div className="mb-4">
            <div className="font-bold">현재 버퍼 내용:</div>
            <div className="p-2 bg-gray-100 rounded">{buffer || '비어있음'}</div>
          </div>
          <div className="space-y-2">
            <button 
              onClick={writeToBuffer}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              스레드 1: 버퍼에 쓰기
            </button>
            <button 
              onClick={() => readFromBuffer(2)}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
              disabled={!writeEvent || readEvent}
            >
              스레드 2: 버퍼에서 읽기
            </button>
            <button 
              onClick={() => readFromBuffer(3)}
              className="bg-purple-500 text-white px-4 py-2 rounded w-full"
              disabled={!writeEvent || readEvent}
            >
              스레드 3: 버퍼에서 읽기
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">작업 로그</h2>
          <div className="border border-gray-300 rounded p-4 h-96 overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="mb-2 p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-500">{log.timestamp}</span>
                <div>{log.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav>
        <Link to="/15" className="text-blue-500 hover:underline mr-4">이전 페이지로 이동</Link>
        <Link to="/17" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page16;