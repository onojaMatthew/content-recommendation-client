import { SaasProduct } from '../../types/saas';
import RecommendationCard from './RecommendationCard';
import EmptyState from '../common/EmptyState';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

interface RecommendationListProps {
  recommendations: SaasProduct[];
}

const RecommendationList = ({ recommendations }: RecommendationListProps) => {
  if (recommendations.length === 0) {
    return (
      <EmptyState
        title="No recommendations found"
        description="Try adjusting your filters to find more options"
        icon={ClipboardDocumentListIcon}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recommendations.map((saas) => (
        <RecommendationCard key={saas.id} saas={saas} />
      ))}
    </div>
  );
};

export default RecommendationList;