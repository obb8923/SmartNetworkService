import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';
const Page7 = () => {
  const [clientStatus, setClientStatus] = useState({
    state: '연결됨',
    serverAddress: '127.0.0.1:9000',
    localPort: '52431',
    bytesReceived: 1024,
    bytesSent: 2048
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">7. TCP 클라이언트 함수 상태</h1>

      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">클라이언트 상태 정보</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">연결 상태</h3>
            <p className="text-lg">{clientStatus.state}</p>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">서버 주소</h3>
            <p className="text-lg">{clientStatus.serverAddress}</p>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">로컬 포트</h3>
            <p className="text-lg">{clientStatus.localPort}</p>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">수신된 바이트</h3>
            <p className="text-lg">{clientStatus.bytesReceived}</p>
          </div>

          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">전송된 바이트</h3>
            <p className="text-lg">{clientStatus.bytesSent}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">클라이언트 함수 설명</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>socket():</strong> TCP 소켓 생성</li>
          <li><strong>connect():</strong> 서버에 연결 요청</li>
          <li><strong>send():</strong> 데이터 전송</li>
          <li><strong>recv():</strong> 데이터 수신</li>
          <li><strong>close():</strong> 연결 종료</li>
        </ul>
      </div>

      <nav>
        <Link to="/8" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page7;
