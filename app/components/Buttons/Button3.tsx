'use client';

interface Button3Props {
  selected: boolean;
  children: React.ReactNode;
  onClick: (event: MouseEvent) => void;
}

const Button3: React.FC<Button3Props> = ({ selected, children, onClick }) => {
  return (
    <button
      className={`${
        selected ? 'bg-red-500' : 'bg-[#1E1D22]'
      } rounded-full px-6 py-2 shadow-sm`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button3;
