import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GNB from '../components/GNB';

const Page9 = () => {
  const [drawingStatus, setDrawingStatus] = useState({
    currentTool: '펜',
    strokeColor: '#000000',
    strokeWidth: 2,
    canvasSize: {
      width: 800, 
      height: 600
    }
  });

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const wsRef = useRef(null);
  const [wsConnected, setWsConnected] = useState(false);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:8080');
    
    wsRef.current.onopen = () => {
      console.log('WebSocket 연결됨');
      setWsConnected(true);
    };

    wsRef.current.onmessage = (event) => {
      console.log('메시지 수신:', event.data);
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket 연결 종료');
      setWsConnected(false);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = drawingStatus.strokeColor;
    ctx.lineWidth = drawingStatus.strokeWidth;
    ctx.lineCap = 'round';
  }, [drawingStatus.strokeColor, drawingStatus.strokeWidth]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setLastPosition({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    if (wsRef.current && wsConnected) {
      wsRef.current.send(JSON.stringify({
        x1: lastPosition.x,
        y1: lastPosition.y,
        x2: x,
        y2: y
      }));
    }

    setLastPosition({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleColorChange = (e) => {
    setDrawingStatus(prev => ({
      ...prev,
      strokeColor: e.target.value
    }));
  };

  const handleWidthChange = (e) => {
    setDrawingStatus(prev => ({
      ...prev,
      strokeWidth: parseInt(e.target.value)
    }));
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <GNB />
      <h1 className="text-2xl font-bold mb-4">9. 네트워크 그림판</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-sm md:col-span-2">
          <canvas
            ref={canvasRef}
            width={drawingStatus.canvasSize.width}
            height={drawingStatus.canvasSize.height}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            className="border border-gray-300 w-full"
            style={{ backgroundColor: 'white' }}
          />
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl font-bold mb-4">그리기 도구</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-2">선 색상</h3>
              <input 
                type="color"
                value={drawingStatus.strokeColor}
                onChange={handleColorChange}
                className="w-full"
              />
            </div>
            <div>
              <h3 className="font-bold mb-2">선 두께</h3>
              <input
                type="range"
                min="1"
                max="20"
                value={drawingStatus.strokeWidth}
                onChange={handleWidthChange}
                className="w-full"
              />
              <p>{drawingStatus.strokeWidth}px</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h2 className="text-xl font-bold mb-4">네트워크 그림판 동작 방식</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>WebSocket 연결:</strong>
            <p>서버와 WebSocket 연결을 통해 실시간 통신이 이루어집니다.</p>
          </li>
          <li>
            <strong>메시지 전송:</strong>
            <p>그리기 좌표가 서버로 전송되어 에코됩니다.</p>
          </li>
          <li>
            <strong>연결 상태:</strong>
            <p>WebSocket 연결 상태를 실시간으로 확인할 수 있습니다.</p>
          </li>
        </ul>
      </div>

      <nav>
        <Link to="/10" className="text-blue-500 hover:underline">다음 페이지로 이동</Link>
      </nav>
    </div>
  );
};

export default Page9;
