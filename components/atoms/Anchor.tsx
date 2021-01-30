const Anchor: React.FC<{ onClick: () => void , children: React.Node }> = ({ onClick, children }) => (
  <button
    className="text-blue-600 hover:underline"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Anchor;
