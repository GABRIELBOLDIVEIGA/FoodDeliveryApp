import { Loader } from "lucide-react";
import { Button } from "../ui/Button/Button";
import { useContext } from "react";
import { LanguageContext } from "src/context/language/LanguageContenxt";

type Props = {
  loading: boolean;
  translateKey: string;
  iconSize?: number;
}

const ButtonSubmit = ({ loading = false, translateKey, iconSize = 24 }: Props) => {
  const { t } = useContext(LanguageContext)
  
  return (
    <Button disabled={loading} className="w-full flex gap-2">
      {loading && <Loader className="animate-spin" size={iconSize} />}
        {t(`${translateKey}`)}
      {loading && <div className={`h-[${iconSize}px] w-[${iconSize}px]`}></div>}
    </Button>
  )
}

export default ButtonSubmit