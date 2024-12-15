import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';

const Page2 = () => {
  const [hostValue, setHostValue] = useState('');
  const [networkValue, setNetworkValue] = useState('');
  const [networkInputValue, setNetworkInputValue] = useState('');
  const [hostOutputValue, setHostOutputValue] = useState('');

  const convertToNetwork = () => {
    // 16진수 문자열을 숫자로 변환
    const num = parseInt(hostValue, 16);
    // 네트워크 바이트 순서로 변환 (htons 함수 시뮬레이션)
    const converted = ((num & 0xFF) << 8) | ((num & 0xFF00) >> 8);
    setNetworkValue(converted.toString(16).padStart(4, '0'));
  };

  const convertToHost = () => {
    // 16진수 문자열을 숫자로 변환
    const num = parseInt(networkInputValue, 16);
    // 호스트 바이트 순서로 변환 (ntohs 함수 시뮬레이션)
    const converted = ((num & 0xFF) << 8) | ((num & 0xFF00) >> 8);
    setHostOutputValue(converted.toString(16).padStart(4, '0'));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">2. 바이트 정렬 함수</h1>
      <div className="mb-6">
        <p className="mb-4">호스트 바이트 순서(Little-Endian)와 네트워크 바이트 순서(Big-Endian) 간의 변환을 수행합니다.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-bold mb-4">호스트 → 네트워크 변환</h3>
            <div className="mb-4">
              <label className="block mb-2">호스트 바이트 값 (16진수):</label>
              <input 
                type="text" 
                value={hostValue}
                onChange={(e) => setHostValue(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="예: 1234"
              />
            </div>
            
            <button 
              onClick={convertToNetwork}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              네트워크 바이트로 변환
            </button>

            {networkValue && (
              <div className="mt-4">
                <p>네트워크 바이트 값: {networkValue}</p>
                <p className="text-sm text-gray-600 mt-2">
                  * 호스트 바이트 순서(LE)에서 네트워크 바이트 순서(BE)로 변환되었습니다.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="font-bold mb-4">네트워크 → 호스트 변환</h3>
            <div className="mb-4">
              <label className="block mb-2">네트워크 바이트 값 (16진수):</label>
              <input 
                type="text" 
                value={networkInputValue}
                onChange={(e) => setNetworkInputValue(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="예: 1234"
              />
            </div>
            
            <button 
              onClick={convertToHost}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              호스트 바이트로 변환
            </button>

            {hostOutputValue && (
              <div className="mt-4">
                <p>호스트 바이트 값: {hostOutputValue}</p>
                <p className="text-sm text-gray-600 mt-2">
                  * 네트워크 바이트 순서(BE)에서 호스트 바이트 순서(LE)로 변환되었습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <nav>
        <Link to="/3" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>

      <div className="mt-8 bg-white p-4 rounded shadow-sm">
        <h2 className="text-xl font-bold mb-4">바이트 순서 설명</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">호스트 바이트 순서 (Little-Endian)</h3>
            <p>- 최하위 바이트(LSB)가 가장 낮은 메모리 주소에 저장됩니다.</p>
            <p>- 주로 x86, x64 CPU 아키텍처에서 사용됩니다.</p>
            <p>- 예: 0x1234는 메모리에 34 12 순서로 저장됩니다.</p>
          </div>
          <div>
            <h3 className="font-bold">네트워크 바이트 순서 (Big-Endian)</h3>
            <p>- 최상위 바이트(MSB)가 가장 낮은 메모리 주소에 저장됩니다.</p>
            <p>- 네트워크 프로토콜의 표준 바이트 순서입니다.</p>
            <p>- 예: 0x1234는 메모리에 12 34 순서로 저장됩니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page2;