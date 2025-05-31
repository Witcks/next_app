import LoginForm from "@/app/(auth)/login/login-form";

export default function Login() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center">Đăng Nhập</h1>
      <div className="flex justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
        <LoginForm />
      </div>
    </div>
  );
}
