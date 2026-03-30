import { Navigate, Route, Routes } from 'react-router-dom';
import { ReportPage } from './pages/ReportPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ReportPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
