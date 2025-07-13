"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  senha: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    router.push("/produtos");
  };
  
  const router = useRouter();

  return (
    
    <main>
      <div className="container-fluid d-flex min-vh-100">
        <div className="row min-vw-100">
          <div className="col-12 col-md-4 bg-light d-flex justify-content-center align-items-center">
            <h2>Bem vindo à WA Loja!</h2>
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>                
                <input
                  type="email" {...register("email", { required: true })}
                  className="form-control form-control-lg"
                  />
                {errors.email && <span className="text-danger small">Email é obrigatório</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  {...register("senha", {
                    required: { value: true, message: "Senha é obrigatória" },
                    minLength: { value: 6, message: "Senha deve ter pelo menos 6 caracteres" }
                  })}
                  className="form-control form-control-lg"
                />
                {errors.senha && <span className="text-danger small">{errors.senha.message}</span>}
              </div>

              <div className="d-grid col-12">
                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Entrar
                </button>
              </div>

              <div className="text-center mt-3">
                <Link href="/cadastro" className="btn btn-link">
                  não tenho cadastro
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}