import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';
const Page15 = () => {
  const [count, setCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const incrementWithoutLock = (user) => {
    setTimeout(() => {
      const temp = count;
      setCount(temp + 1);
      addLog(`${user}가 카운트 증가 (락 없음): ${temp} -> ${temp + 1}`);
    }, Math.random() * 1000);
  };

  const incrementWithLock = (user) => {
    if (isLocked) {
      addLog(`${user}가 락이 걸려있어 작업을 수행할 수 없습니다.`);
      return;
    }

    setIsLocked(true);
    addLog(`${user}가 락 획득`);

    setTimeout(() => {
      const temp = count;
      setCount(temp + 1);
      addLog(`${user}가 카운트 증가 (락 사용): ${temp} -> ${temp + 1}`);
      
      setIsLocked(false);
      addLog(`${user}가 락 해제`);
    }, 1000); // 1초로 고정
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">15. 임계 영역 시뮬레이션</h1>

      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">현재 카운트: {count}</h2>
            <div className={`w-4 h-4 rounded-full ${isLocked ? 'bg-red-500' : 'bg-green-500'}`} 
                 title={isLocked ? '락 걸림' : '락 해제'}></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">사용자 A</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => incrementWithoutLock('사용자 A')}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  락 없이 증가
                </button>
                <button
                  onClick={() => incrementWithLock('사용자 A')}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  락을 사용하여 증가
                </button>
              </div>
            </div>
            
            <div className="border p-4 rounded">
              <h3 className="font-bold mb-2">사용자 B</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => incrementWithoutLock('사용자 B')}
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  락 없이 증가
                </button>
                <button
                  onClick={() => incrementWithLock('사용자 B')}
                  className="bg-purple-500 text-white px-4 py-2 rounded"
                >
                  락을 사용하여 증가
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">작업 로그</h2>
          <div className="border border-gray-300 rounded p-4 h-60 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">임계 영역과 락의 중요성</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>임계 영역:</strong>
            <p>여러 프로세스가 공유하는 자원에 접근하는 코드 영역입니다.</p>
          </li>
          <li>
            <strong>락의 역할:</strong>
            <p>한 번에 하나의 프로세스만 임계 영역에 접근할 수 있도록 보장합니다.</p>
          </li>
          <li>
            <strong>경쟁 상태:</strong>
            <p>락이 없으면 여러 프로세스가 동시에 접근하여 데이터 불일치가 발생할 수 있습니다.</p>
          </li>
        </ul>
      </div>

      <nav>
        <Link to="/14" className="text-blue-500 hover:underline mr-4">이전 페이지로 이동</Link>
        <Link to="/16" className="text-blue-500 hover:underline mr-4">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page15;
