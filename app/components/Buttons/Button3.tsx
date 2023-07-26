'use client';

interface Button3Props {
  selected?: boolean;
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  primary: boolean;
}

const Button3: React.FC<Button3Props> = ({
  selected,
  children,
  onClick,
  primary,
}) => {
  return (
    <button
      className={`${
        selected ? 'bg-custom-red' : 'bg-[#1E1D22]'
      } rounded-lg px-10 py-2 shadow-sm ${
        primary ? 'bg-custom-red' : 'bg-transparent border-custom-red border'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button3;
