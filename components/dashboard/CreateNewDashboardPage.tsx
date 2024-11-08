interface CreateNewDashboardPageProps {
    children: React.ReactNode;
  }
  
  export const CreateNewDashboardPage: React.FC<CreateNewDashboardPageProps> = ({ children }) => {
    return (
      <div className="bg-white dark:bg-neutral-700 p-6 rounded-lg shadow-md">
        {children}
      </div>
    );
  };
  