import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">My Application</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/login" className="hover:underline">
              Đăng nhập
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:underline">
              Đăng ký
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}
