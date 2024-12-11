export const GlobalLoading: React.FC = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/50 z-50">
        <div className="animate-spin rounded-full lg:h-16 lg:w-16 w-10 h-10 border-t-4 border-primary/90"></div>
      </div>
    );
  };