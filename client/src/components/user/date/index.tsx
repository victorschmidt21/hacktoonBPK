// const formatDate = (dateString?: string) => {
  
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "Data inválida";
  
//     return date.toLocaleDateString("pt-BR", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   };
  

// export function Date({ date }: { date: string }) {
//   return (
//     <div>
//       <div className="font-medium text-gray-900">Data de término</div>
//       <div className="text-gray-500 text-sm">{formatDate(date)}</div>
//     </div>
//   );
// }
