"dependencies": {
    "axios": "^1.11.0",
    "bootstrap": "^5.3.8",
    "prop-types": "^15.8.1",
    "react": "^19.1.1",
    "react-bootstrap": "^2.10.10",
    "react-dom": "^19.1.1",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.8.2"
  },
Cài đặt concurrently bằng lệnh npm install concurrently --save-dev
Sửa dòng "dev" trong "scripts" của package.json thành:
"dev": "concurrently \"vite\" \"json-server --watch db.json --port 3001\"",
Chạy lệnh npm run dev để vừa khởi động json server, vừa chạy trang web