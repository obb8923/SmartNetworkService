import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';
const Page4 = () => {
  const [domainInput, setDomainInput] = useState('');
  const [ipOutput, setIpOutput] = useState('');
  const [ipInput, setIpInput] = useState('');
  const [domainOutput, setDomainOutput] = useState('');

  const handleGetIPAddr = () => {
    // 실제로는 DNS 조회를 수행해야 하지만, 여기서는 예시로 구현
    if (domainInput === 'www.example.com') {
      setIpOutput('93.184.216.34');
    } else if (domainInput === 'www.google.com') {
      setIpOutput('142.250.196.68');
    } else {
      setIpOutput('도메인을 찾을 수 없습니다.');
    }
  };

  const handleGetDomainName = () => {
    // 실제로는 역방향 DNS 조회를 수행해야 하지만, 여기서는 예시로 구현
    if (ipInput === '93.184.216.34') {
      setDomainOutput('www.example.com');
    } else if (ipInput === '142.250.196.68') {
      setDomainOutput('www.google.com');
    } else {
      setDomainOutput('IP 주소에 해당하는 도메인을 찾을 수 없습니다.');
    }
  };

  const setExampleDomain = () => {
    setDomainInput('www.google.com');
  };

  const setExampleIP = () => {
    setIpInput('142.250.196.68');
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">4. DNS와 이름 변환 함수</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">GetIPAddr (gethostbyname)</h2>
          <div className="mb-4">
            <label className="block mb-2">도메인 이름:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="예: www.example.com"
              />
              <button
                onClick={setExampleDomain}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                예시
              </button>
            </div>
          </div>
          <button
            onClick={handleGetIPAddr}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            IP 주소 조회
          </button>
          {ipOutput && (
            <div className="mt-4">
              <p>IP 주소:</p>
              <code className="block bg-gray-100 p-2 mt-2">{ipOutput}</code>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">GetDomainName (gethostbyaddr)</h2>
          <div className="mb-4">
            <label className="block mb-2">IP 주소:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="예: 93.184.216.34"
              />
              <button
                onClick={setExampleIP}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                예시
              </button>
            </div>
          </div>
          <button
            onClick={handleGetDomainName}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            도메인 이름 조회
          </button>
          {domainOutput && (
            <div className="mt-4">
              <p>도메인 이름:</p>
              <code className="block bg-gray-100 p-2 mt-2">{domainOutput}</code>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">함수 설명</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>GetIPAddr (gethostbyname):</strong>
            <p>도메인 이름을 IP 주소로 변환하는 함수입니다. DNS 서버에 질의하여 해당 도메인의 IP 주소를 얻습니다.</p>
          </li>
          <li>
            <strong>GetDomainName (gethostbyaddr):</strong>
            <p>IP 주소를 도메인 이름으로 변환하는 함수입니다. 역방향 DNS 조회를 통해 IP 주소에 해당하는 도메인 이름을 얻습니다.</p>
          </li>
        </ul>
      </div>

      <nav>
        <Link to="/5" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page4;