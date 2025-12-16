import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface NotificationProps {
  show: boolean;
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ show, message }) => {
  return (
    <div
      className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55) ${
        show ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0'
      }`}
    >
      <div className="flex items-center gap-3 bg-gradient-to-br from-green-900/90 to-green-950/90 backdrop-blur-md border border-green-500/30 text-white px-8 py-4 rounded-full shadow-[0_0_30px_rgba(0,255,136,0.3)]">
        <CheckCircle2 className="w-5 h-5 text-green-400" />
        <span className="font-inter font-semibold tracking-wide text-sm md:text-base">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
