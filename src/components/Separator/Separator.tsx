type Props = {
  text: string;
};

export const Separator = ({ text }: Props) => {
  return (
    <div className="flex items-center gap-2 pt-6">
      <div className="border-b border-border w-full" />
      <p className="w-max">{text}</p>
      <div className="border-b border-border w-full" />
    </div>
  );
};
