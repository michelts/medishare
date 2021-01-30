const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="text-xl mb-3">
    {children}
  </h1>
);

export default Title;
