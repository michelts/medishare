type Props = { children: React.ReactNode };

const Title: React.FC<Props> = ({ children }) => (
  <h1 className="text-xl mb-3">
    {children}
  </h1>
);

export default Title;
