import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';
const Page5 = () => {
  const [connections, setConnections] = useState([
    {
      protocol: 'TCP',
      localAddress: '0.0.0.0:9000',
      foreignAddress: '0.0.0.0:0',
      state: 'LISTENING',
      pid: '1234'
    },
    {
      protocol: 'TCP', 
      localAddress: '127.0.0.1:9000',
      foreignAddress: '127.0.0.1:52431',
      state: 'ESTABLISHED',
      pid: '1234'
    }
  ]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">5. 서버 상태 확인</h1>
      
      <div className="bg-white p-4 rounded shadow-sm mb-6">
        <h2 className="text-xl font-bold mb-4">TCP 연결 상태 (포트 9000)</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">프로토콜</th>
                <th className="px-4 py-2 text-left">로컬 주소</th>
                <th className="px-4 py-2 text-left">외부 주소</th>
                <th className="px-4 py-2 text-left">상태</th>
                <th className="px-4 py-2 text-left">PID</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((conn, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{conn.protocol}</td>
                  <td className="px-4 py-2">{conn.localAddress}</td>
                  <td className="px-4 py-2">{conn.foreignAddress}</td>
                  <td className="px-4 py-2">{conn.state}</td>
                  <td className="px-4 py-2">{conn.pid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">명령어 설명</h2>
        <code className="block bg-gray-100 p-3 mb-4">
          netstat -a -n -p tcp | findstr 9000
        </code>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>-a:</strong> 모든 연결과 수신 대기 포트를 표시</li>
          <li><strong>-n:</strong> 주소와 포트 번호를 숫자 형식으로 표시</li>
          <li><strong>-p tcp:</strong> TCP 프로토콜 연결만 표시</li>
          <li><strong>findstr 9000:</strong> 포트 9000 관련 연결만 필터링</li>
        </ul>
      </div>

      <nav>
        <Link to="/6" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page5;