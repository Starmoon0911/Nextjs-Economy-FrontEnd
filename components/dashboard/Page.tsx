interface PageProps {
    title: string;
    desc: string;
    children: React.ReactNode;
  }
  
  export const Page: React.FC<PageProps> = ({ title, desc, children }) => {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold dark:text-white">{title}</h1>
          <p className="text-sm text-neutral-400 dark:text-neutral-00 border-b-2 pb-2 border-gray-200  dark:border-gray-600 ">{desc}</p>
        </div>
        {children}
      </div>
    );
  };
  