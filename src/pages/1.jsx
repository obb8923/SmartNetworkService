import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';
const Page1 = () => {
  const [ipConfig, setIpConfig] = useState('');

  const handleIpConfig = () => {
    // 실제 환경에서는 백엔드 API를 통해 ipconfig /all 명령어 결과를 받아와야 합니다
    const sampleOutput = `
Windows IP 구성

   호스트 이름 . . . . . . . . : DESKTOP-ABC123
   주 DNS 접미사 . . . . . . . : 
   노드 유형 . . . . . . . . . : 혼성
   IP 라우팅 사용 . . . . . . : 아니요
   WINS 프록시 사용 . . . . . : 아니요

이더넷 어댑터 이더넷:

   연결별 DNS 접미사. . . . : 
   설명 . . . . . . . . . . : Intel(R) Ethernet Connection
   물리적 주소 . . . . . . . : 00-11-22-33-44-55
   DHCP 사용 . . . . . . . . : 예
   자동 구성 사용. . . . . . : 예
   IPv4 주소 . . . . . . . . : 192.168.0.100
   서브넷 마스크 . . . . . . : 255.255.255.0
   기본 게이트웨이 . . . . . : 192.168.0.1
    `;
    setIpConfig(sampleOutput);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">1. ipconfig로 IP 구성 내용 확인</h1>
      <button 
        onClick={handleIpConfig}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        ipconfig /all 실행
      </button>
      
      {ipConfig && (
        <pre className="bg-white p-4 rounded shadow-sm mb-4 overflow-x-auto">
          {ipConfig}
        </pre>
      )}
      
      <nav>
        <Link to="/2" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page1;
