import Link from 'next/link';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { SaasProduct } from '../../types/saas';

interface RecommendationCardProps {
  saas: SaasProduct;
}

const RecommendationCard = ({ saas }: RecommendationCardProps) => {
  const renderRating = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        i < Math.floor(saas.rating) ? 
          <FaStar key={i} className="text-yellow-400 inline-block" /> : 
          <FaRegStar key={i} className="text-yellow-400 inline-block" />
      ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
      <div className="p-4 border-b flex items-center gap-3">
        <img 
          src={saas.logo} 
          alt={`${saas.name} logo`} 
          className="w-10 h-10 object-contain rounded"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/images/default-saas-logo.png';
          }}
        />
        <h3 className="text-lg font-semibold">{saas.name}</h3>
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-gray-600 mb-3 line-clamp-2">
          {saas.shortDescription || saas.description.substring(0, 100)}...
        </p>
        
        <div className="mb-3">
          <div className="flex items-center">
            {renderRating()}
            <span className="ml-1 text-sm text-gray-500">
              ({saas.totalReviews || 0} reviews)
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <span className="font-medium text-gray-900">
            ${saas.price?.monthly}
          </span>
          <span className="text-gray-500 text-sm">/month</span>
          {saas.price?.annual && (
            <span className="ml-2 text-gray-500 text-sm">
              (${saas.price.annual}/year)
            </span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {saas.categories?.slice(0, 3).map((cat) => (
            <span 
              key={cat} 
              className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
            >
              {cat}
            </span>
          ))}
          {saas.categories?.length > 3 && (
            <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
              +{saas.categories.length - 3}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t flex justify-between items-center">
        <a 
          href={saas.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Visit Website
        </a>
        <Link 
          href={`/saas/${saas.id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RecommendationCard;