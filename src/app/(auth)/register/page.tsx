import RegisterForm from "@/app/(auth)/register/register-form";

export default function Register() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center">Đăng ký</h1>
      <div className="flex justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
        <RegisterForm />
      </div>
    </div>
  );
}
