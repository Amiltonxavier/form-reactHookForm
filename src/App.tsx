import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"




const LoginSchema = z.object({
  email: z.string().email("formato de email incorreto"),
  username: z.string()
    .nonempty("Nome do usuário é um campo obrigatório"),
  password: z.string()
    .min(8, "Senha deve possuir pelo menos 8 caractéres")
    .nonempty("Senha é um campo obrigatório")
});




type LoginDataTypes = z.infer<typeof LoginSchema>


function App() {

  const { register, handleSubmit, formState: { errors } } = useForm<LoginDataTypes>({
    resolver: zodResolver(LoginSchema)
  })
  const [outInput, setOutInput] = useState<LoginDataTypes>()

  const handleOnSubmit = (data: LoginDataTypes) => {
    setOutInput(data);
    console.log(register)
  }

  return (
    <main className="w-full min-h-screen flex flex-col gap-4">
      <form onSubmit={handleSubmit(handleOnSubmit)} className="overflow-hidden flex flex-col gap-6 items-center justify-center">
        <div className="text-left">
          <h4 className="text-zinc-600 text-xl font-semibold">Login</h4>
        </div>
        
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-zinc-500 text-sm">Nome de usuário</label>
          <input
            type="text"
            id="username"
            className="w-80 border border-zinc-200 text-zinc-500 outline-none p-2"
            {...register("username")}
          />
          {errors.username && <span className="text-red-500">{errors.username.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-zinc-500 text-sm">Email</label>
          <input
            type="email"
            id="email"
            className="w-80 border border-zinc-200 text-zinc-500 outline-none p-2"
            {...register("email")}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="senha" className="text-zinc-500 text-sm">Senha</label>
          <input
            type="password"
            id="senha"
            className="w-80 border border-zinc-200 text-zinc-500 outline-none p-2"
            {...register("password")}
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>

        <button className= {`w-80 block bg-emerald-500 py-2 rounded-lg px-2 text-emerald-100 disabled:opacity-65 disabled:cursor-not-allowed`}>Salvar</button>

      </form>

      {
        JSON.stringify(outInput, null, 2)
      }
    </main>
  )
}

export default App
