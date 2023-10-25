import { Card } from "src/components/ui/Card/Card"
import { usePerfil } from "./form/usePerfil"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "src/components/ui/Form/Form"
import { Input } from "src/components/ui/Input/Input"
import { Button } from "src/components/ui/Button/Button"
import Header from "./PerfilHeader/PerfilHeader"
import { Loader } from "lucide-react"
import { cn } from "src/lib/utils"

const Perfil = () => {
  const { form, submitForm, loadingSubmit } = usePerfil();

  return (
    <section>
      <Header />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="flex flex-col gap-5 px-2 pt-[72px]">

          <Card className="p-2 border border-primary dark:border-border">
            <div className="flex justify-center -translate-y-5">
              <p className="min-w-max bg-primary rounded-full px-2 text-muted dark:text-secondary-foreground font-semibold shadow-md ">User info</p>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document</FormLabel>
                  <FormControl>
                    <Input placeholder="Document" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className="p-2 border border-primary dark:border-border">
            <div className="flex justify-center -translate-y-5">
              <p className="min-w-max bg-primary rounded-full px-2 text-muted dark:text-secondary-foreground font-semibold shadow-md ">Delivery Address</p>
            </div>

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZipCode</FormLabel>
                  <FormControl>
                    <Input placeholder="ZipCode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neighborhood</FormLabel>
                  <FormControl>
                    <Input placeholder="Neighborhood" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Button type="submit" className="flex gap-2" disabled={loadingSubmit}>
            <Loader className={cn("animate-spin", !loadingSubmit && 'sr-only')} />
            Submit
            <div className={cn("w-[24px] h-[24px]", !loadingSubmit && 'sr-only')}></div>
          </Button>
        </form>
      </Form>

    </section>
  )
}

export default Perfil