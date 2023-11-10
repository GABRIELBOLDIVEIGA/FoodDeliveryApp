import { Card } from "src/components/ui/Card/Card";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { deliveryInstance } from "src/services/deliveryInstance";
import { Profile, profileValidator } from "src/validator/perfil/perfilValidator";

const Users = () => {
  const [users, setUsers] = useState<Array<Profile>>();

  useEffect(() => {
    deliveryInstance.get('/user')
      .then((res) => { 
        const parse = profileValidator.array().safeParse(res.data);
        if(parse.success) {
          setUsers(parse.data);
        } else {
          console.log(parse);
        }
      })
      .catch((err) => { console.log(err) })
  },[])

  return (
    <section>
      <Header translateKey="Users.title" />
      
      <section className="flex flex-col gap-2 py-20 bg-background px-2">
        {users?.map((user) => (
          <CardUser {...user} />
        ))}
      </section>
    </section>
  )
}

export default Users


const CardUser = (user: Profile) => {

  return(
    <Card className="p-2 border border-border">
      {user.name}
    </Card>
  )
}