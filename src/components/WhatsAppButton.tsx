import React from 'react';

export default function WhatsAppButton() {
  const phoneNumber = "212661518927";
  const message = encodeURIComponent("Bonjour AMTDA Maroc, je vous contacte depuis le site web pour avoir plus d'informations.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 left-6 sm:left-auto sm:right-6 bg-[#25D366] hover:bg-[#20ba56] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-40 flex items-center justify-center cursor-pointer group transform hover:-translate-y-1 hover:scale-105 active:scale-95 border border-emerald-500/20"
      aria-label="Contactez-nous sur WhatsApp"
      id="whatsapp-floating-btn"
    >
      {/* Wave animation rings */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 group-hover:animate-ping -z-10"></span>
      
      {/* Official WhatsApp SVG Icon */}
      <svg 
        className="w-6 h-6 fill-current" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.636-1.023-5.115-2.885-6.978C16.526 1.899 14.053.87 11.41.869 5.975.869 1.55 5.288 1.547 10.725c-.001 1.743.453 3.441 1.316 4.939L1.87 20.353l4.777-1.199zm11.666-4.733c-.29-.146-1.727-.853-1.993-.95-.266-.097-.46-.146-.653.146-.193.29-.747.95-.913 1.144-.167.194-.333.219-.623.073-.29-.147-1.226-.452-2.335-1.441-.864-.771-1.447-1.723-1.616-2.015-.17-.29-.018-.447.127-.592.13-.13.29-.34.436-.509.145-.17.193-.291.29-.485.097-.194.049-.364-.025-.509-.073-.146-.653-1.577-.893-2.16-.233-.562-.47-.485-.653-.495-.17-.008-.364-.01-.557-.01-.193 0-.507.073-.77.364-.263.29-1.004.981-1.004 2.394 0 1.413 1.028 2.777 1.171 2.971.144.194 2.017 3.08 4.886 4.318.682.294 1.214.47 1.629.601.685.218 1.31.187 1.802.114.549-.081 1.727-.705 1.973-1.385.246-.68.246-1.263.173-1.385-.073-.122-.266-.194-.557-.341z" />
      </svg>

      {/* Tooltip on hover */}
      <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap hidden sm:inline-block">
        Contactez l'AMTDA
      </span>
    </a>
  );
}
