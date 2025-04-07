import { useLocation } from "react-router-dom"
function Failure(){
    const location = useLocation();

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto">
        <div className="flex items-center justify-center mb-6">
          <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <h1 className="text-4xl font-bold text-gray-800 ml-4">Failure</h1>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Error: <span className="font-medium">{location.state?.error}</span>
          </p>
          <p className="text-gray-600">
            Reason: <span className="font-medium">{location.state?.reason}</span>
          </p>
        </div>
      </div>
    )
}
export default Failure;