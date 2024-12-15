import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';

const Page6 = () => {
  const [serverStatus, setServerStatus] = useState({
    state: 'LISTEN',
    backlog: 5,
    boundAddress: '0.0.0.0:9000',
    connections: 0
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">6. TCP 서버 함수 상태</h1>

      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">서버 상태 정보</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">현재 상태</h3>
            <p className="text-lg">{serverStatus.state}</p>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Backlog 크기</h3>
            <p className="text-lg">{serverStatus.backlog}</p>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">바인딩된 주소</h3>
            <p className="text-lg">{serverStatus.boundAddress}</p>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">활성 연결 수</h3>
            <p className="text-lg">{serverStatus.connections}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">서버 함수 설명</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>socket():</strong> TCP 소켓 생성</li>
          <li><strong>bind():</strong> 소켓을 특정 주소와 포트에 바인딩</li>
          <li><strong>listen():</strong> 연결 요청 대기 상태로 진입</li>
          <li><strong>accept():</strong> 클라이언트의 연결 요청을 수락</li>
        </ul>
      </div>

      <nav>
        <Link to="/7" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page6;