import { useState, useCallback } from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';

const CopyToClipboard: React.FC<{ text: string, label: string }> = ({ text, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 750);
  }, [setCopied]);

  return (
    <ReactCopyToClipboard
      text={text}
      onCopy={handleCopy}
    >
      {copied ? <span>Copied</span> : <button>{label}</button>}
    </ReactCopyToClipboard>
  );
};

export default CopyToClipboard;
