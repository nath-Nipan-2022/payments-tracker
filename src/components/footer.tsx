import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <footer className="bg-slate-900 text-white p-8">
        <div className="py-6 border-b border-teal-600 mb-8">
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-inherit text-teal-200"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={24}
              height={24}
              className="invert"
            />
            EduPurse
          </Link>
        </div>

        <div className="mx-auto flex items-center justify-between">
          <p>&copy; 2024 EduPurse. All rights reserved.</p>

          <div>
            <a href="#" className="text-gray-300 hover:text-white mx-2">
              About
            </a>
            <a
              href="tel:+917005537020"
              className="text-gray-300 hover:text-white mx-2"
            >
              Contact
            </a>
            <a href="#" className="text-gray-300 hover:text-white mx-2">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
