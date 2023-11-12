import { useContext } from "react";
import { LanguageContext } from "src/context/language/LanguageContenxt";
import { cn } from "src/lib/utils";

interface MessageErrorProps {
  className?: string;
  text?: string;
  translateKey?: string;
}

export const MessageError = ({ text, className, translateKey}: MessageErrorProps) => {
  const { t } = useContext(LanguageContext)
  return (
    <h1 className={cn("text-center", className)}>{translateKey ? t(`${translateKey}`) : text}</h1>
  )
}