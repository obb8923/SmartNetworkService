import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';
const Page3 = () => {
  const [ipv4Input, setIpv4Input] = useState('');
  const [binaryOutput, setBinaryOutput] = useState('');
  const [numericInput, setNumericInput] = useState('');
  const [ipv4Output, setIpv4Output] = useState('');
  const [int32Input, setInt32Input] = useState('');
  const [networkOutput, setNetworkOutput] = useState('');

  // inet_pton 구현 (IPv4 문자열 -> 32비트 이진수)
  const handleInetPton = () => {
    try {
      const parts = ipv4Input.split('.');
      if (parts.length !== 4) throw new Error('잘못된 IPv4 형식');
      
      const binary = parts.map(part => {
        const num = parseInt(part);
        if (num < 0 || num > 255) throw new Error('잘못된 IPv4 형식');
        return num.toString(2).padStart(8, '0');
      }).join('');
      
      setBinaryOutput(binary);
    } catch (error) {
      setBinaryOutput('오류: ' + error.message);
    }
  };

  // inet_ntop 구현 (32비트 숫자 -> IPv4 문자열)
  const handleInetNtop = () => {
    try {
      const num = parseInt(numericInput);
      if (isNaN(num) || num < 0 || num > 0xFFFFFFFF) {
        throw new Error('잘못된 32비트 숫자');
      }

      const ipParts = [];
      for (let i = 3; i >= 0; i--) {
        ipParts.push(((num >> (i * 8)) & 255).toString());
      }
      
      setIpv4Output(ipParts.join('.'));
    } catch (error) {
      setIpv4Output('오류: ' + error.message);
    }
  };

  // htonl 구현 (호스트 -> 네트워크 바이트 순서)
  const handleHtonl = () => {
    try {
      const num = parseInt(int32Input);
      if (isNaN(num)) throw new Error('잘못된 숫자');
      
      // 32비트 호스트 바이트 순서를 네트워크 바이트 순서로 변환
      const converted = (
        ((num & 0xFF) << 24) |
        ((num & 0xFF00) << 8) |
        ((num & 0xFF0000) >> 8) |
        ((num & 0xFF000000) >>> 24)
      >>> 0); // 부호 없는 32비트로 변환
      
      setNetworkOutput(converted.toString(16).padStart(8, '0'));
    } catch (error) {
      setNetworkOutput('오류: ' + error.message);
    }
  };

  // 예시 데이터 설정 함수들
  const setExampleIpv4 = () => {
    setIpv4Input('192.168.0.1');
  };

  const setExampleNumeric = () => {
    setNumericInput('3232235521');
  };

  const setExampleInt32 = () => {
    setInt32Input('12345678');
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">3. IP 주소 변환 함수</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">inet_pton (IPv4)</h2>
          <div className="mb-4">
            <label className="block mb-2">IPv4 주소 입력:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={ipv4Input}
                onChange={(e) => setIpv4Input(e.target.value)}
                className="border p-2 rounded flex-grow"
                placeholder="예: 192.168.0.1"
              />
              <button
                onClick={setExampleIpv4}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              >
                예시
              </button>
            </div>
          </div>
          <button
            onClick={handleInetPton}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            변환
          </button>
          {binaryOutput && (
            <div className="mt-4">
              <p>이진수 결과:</p>
              <code className="block bg-gray-100 p-2 mt-2">{binaryOutput}</code>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">inet_ntop (IPv4)</h2>
          <div className="mb-4">
            <label className="block mb-2">32비트 숫자 입력:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={numericInput}
                onChange={(e) => setNumericInput(e.target.value)}
                className="border p-2 rounded flex-grow"
                placeholder="예: 3232235521"
              />
              <button
                onClick={setExampleNumeric}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              >
                예시
              </button>
            </div>
          </div>
          <button
            onClick={handleInetNtop}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            변환
          </button>
          {ipv4Output && (
            <div className="mt-4">
              <p>IPv4 주소:</p>
              <code className="block bg-gray-100 p-2 mt-2">{ipv4Output}</code>
            </div>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">htonl/ntohl</h2>
          <div className="mb-4">
            <label className="block mb-2">32비트 정수 입력 (16진수):</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={int32Input}
                onChange={(e) => setInt32Input(e.target.value)}
                className="border p-2 rounded flex-grow"
                placeholder="예: 12345678"
              />
              <button
                onClick={setExampleInt32}
                className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
              >
                예시
              </button>
            </div>
          </div>
          <button
            onClick={handleHtonl}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            호스트 → 네트워크 변환
          </button>
          {networkOutput && (
            <div className="mt-4">
              <p>네트워크 바이트 순서:</p>
              <code className="block bg-gray-100 p-2 mt-2">{networkOutput}</code>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">함수 설명</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>inet_pton:</strong> 사람이 읽을 수 있는 IP 주소를 네트워크 바이트 순서의 이진 형식으로 변환</li>
          <li><strong>inet_ntop:</strong> 네트워크 바이트 순서의 이진 형식을 사람이 읽을 수 있는 IP 주소로 변환</li>
          <li><strong>htonl:</strong> 호스트 바이트 순서의 32비트 정수를 네트워크 바이트 순서로 변환</li>
          <li><strong>ntohl:</strong> 네트워크 바이트 순서의 32비트 정수를 호스트 바이트 순서로 변환</li>
        </ul>
      </div>

      <nav>
        <Link to="/4" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page3;