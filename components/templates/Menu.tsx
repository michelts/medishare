import React from 'react';
import { useRouter } from 'next/router'
import Link from "next/link"

const Menu: React.FC = () => {
  const { asPath } = useRouter();
  return (
    <div className="w-full bg-blue-900">
      <div className="container mx-auto text-white p-3">
        <nav className="flex justify-between">
          <div>
            <Link href="/">
              <a className="hover:underline">
                MediShare
              </a>
            </Link>
          </div>
          <ul className="flex flex-row">
            <li
              className={`${asPath === '/' && 'font-bold'}`}
            >
              <Link href="/">
                <a className="hover:underline">
                  + Share
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
