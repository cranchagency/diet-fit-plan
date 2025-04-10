interface StepCardProps {
   number: number;
   title: string;
   description: string;
}
 
export default function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="relative bg-white rounded-2xl p-6 shadow-sm">
      <div className="mb-4">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
          {number}
        </div>
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}