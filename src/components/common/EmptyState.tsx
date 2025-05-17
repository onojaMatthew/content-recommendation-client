import { ComponentType, SVGProps } from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

const EmptyState = ({
  title,
  description,
  icon: Icon,
  actionText,
  actionHref,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="text-center py-12">
      {Icon && (
        <Icon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      )}
      <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      
      {(actionText && (actionHref || onAction)) && (
        <div className="mt-6">
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {actionText}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;