import { SideDish as SideDishType } from 'src/validator/sideDish/sideDishValidator';
import { cn } from 'src/lib/utils';
import { Card } from 'src/components/ui/Card/Card';

type SideDishProps = {
  className?: string;
} & SideDishType

export const SideDishCard = ({ _id, avaliable, description, name, price, className}: SideDishProps) => {
  return (
    <Card className={cn('border-border p-2', className)} id={_id}>
      <p>Name: {name}</p>
      <p>Description: {description}</p>
      <p>Avaliable: {avaliable}</p>
      <p>Price: {price}</p>
    </Card>
  )
}