import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';

const Page8 = () => {
  const [socketStatus, setSocketStatus] = useState({
    receiveBuffer: {
      size: 8192, // 바이트 단위
      used: 2048,
      free: 6144
    },
    sendBuffer: {  
      size: 8192,
      used: 1024, 
      free: 7168
    }
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">8. 소켓 버퍼 상태</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">수신 버퍼 상태</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">전체 크기</h3>
              <p className="text-lg">{socketStatus.receiveBuffer.size} 바이트</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">사용 중인 공간</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-blue-500 h-4 rounded-full"
                  style={{width: `${(socketStatus.receiveBuffer.used / socketStatus.receiveBuffer.size) * 100}%`}}
                ></div>
              </div>
              <p className="mt-1">{socketStatus.receiveBuffer.used} 바이트</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">남은 공간</h3>
              <p>{socketStatus.receiveBuffer.free} 바이트</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">송신 버퍼 상태</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">전체 크기</h3>
              <p className="text-lg">{socketStatus.sendBuffer.size} 바이트</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">사용 중인 공간</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full"
                  style={{width: `${(socketStatus.sendBuffer.used / socketStatus.sendBuffer.size) * 100}%`}}
                ></div>
              </div>
              <p className="mt-1">{socketStatus.sendBuffer.used} 바이트</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">남은 공간</h3>
              <p>{socketStatus.sendBuffer.free} 바이트</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">소켓 버퍼 설명</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>수신 버퍼:</strong>
            <p>네트워크로부터 받은 데이터를 임시 저장하는 공간입니다. 애플리케이션이 recv() 함수로 데이터를 읽을 때까지 보관됩니다.</p>
          </li>
          <li>
            <strong>송신 버퍼:</strong>
            <p>애플리케이션이 전송하려는 데이터를 임시 저장하는 공간입니다. 실제로 네트워크로 전송될 때까지 보관됩니다.</p>
          </li>
        </ul>
      </div>

      <nav>
        <Link to="/9" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page8;
