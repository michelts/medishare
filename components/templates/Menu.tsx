import React from 'react';
import { useRouter } from 'next/router'
import Link from "next/link"

const Menu = () => {
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
              className={`pr-5 ${asPath === '/' && 'font-bold'}`}
            >
              <Link href="/">
                <a className="hover:underline">
                  Shared <span className="hidden sm:inline">Content</span>
                </a>
              </Link>
            </li>
            <li
              className={`pr-5 ${asPath === '/patients' && 'font-bold'}`}
            >
              <Link href="/patients">
                <a className="hover:underline">
                  Patients
                </a>
              </Link>
            </li>
            <li
              className={`${asPath === '/add-shared-content' && 'font-bold'}`}
            >
              <Link href="/add-shared-content">
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
