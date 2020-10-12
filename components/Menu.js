import Link from "next/link";
import { useState } from "react";
import Transition from "./Transition";

import { useAuth } from "../hooks/useFirebase";

function ButtonOrLink({ children, href, onClick, className }) {
  if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  } else {
    return (
      <Link href={href}>
        <a className={className}>{children}</a>
      </Link>
    );
  }
}

export default function Menu() {
  const { user, signinWithGoogle, signOut } = useAuth();
  // displayName, photoURL, email

  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const links = [
    {
      title: "Videos",
      href: "/",
      isActive: false,
    },
    // {
    //   title: "Team",
    //   href: "/team",
    //   isActive: false,
    // },
  ];

  const profileLinks = [
    {
      title: "Settings",
      href: "/settings",
    },
    {
      title: "Sign out",
      onClick: () => {
        setIsProfileOpen(false);
        signOut();
      },
    },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-4 sm:px-0">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg"
                  alt="Workflow logo"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {links.map(({ title, href, isActive }) => (
                    <ButtonOrLink
                      key={title}
                      href={href}
                      className={`${
                        isActive
                          ? "text-white bg-gray-900"
                          : "text-gray-300 hover:text-white hover:bg-gray-700"
                      } px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:text-white focus:bg-gray-700`}
                    >
                      {title}
                    </ButtonOrLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {user && (
                  <button
                    className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700"
                    aria-label="Notifications"
                  >
                    <svg
                      className="h-6 w-6"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                )}

                {/* Profile dropdown */}
                <div className="ml-3 relative">
                  <div>
                    {user && (
                      <button
                        className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
                        id="user-menu"
                        aria-label="User menu"
                        aria-haspopup="true"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                      >
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.photoURL}
                          alt=""
                        />
                      </button>
                    )}
                    {!user && (
                      <ButtonOrLink
                        className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:text-white focus:bg-gray-700"
                        onClick={signinWithGoogle}
                      >
                        Sign up/Log in
                      </ButtonOrLink>
                    )}
                  </div>

                  <Transition
                    show={isProfileOpen}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                      <div className="py-1 rounded-md bg-white shadow-xs">
                        {profileLinks.map(({ title, href, onClick }) => (
                          <ButtonOrLink
                            key={title}
                            href={href}
                            onClick={onClick}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {title}
                          </ButtonOrLink>
                        ))}
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {/* Menu open: "hidden", Menu closed: "block" */}
                <svg
                  className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Menu open: "block", Menu closed: "hidden" */}
                <svg
                  className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*
            Mobile menu, toggle classes based on menu state.

            Open: "block", closed: "hidden"
          */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } border-b border-gray-700 md:hidden`}
      >
        <div className="px-2 py-3 space-y-1 sm:px-3">
          {links.map(({ title, href, isActive }) => (
            <ButtonOrLink
              key={title}
              href={href}
              className={`${
                isActive
                  ? "text-white bg-gray-900"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              } block px-3 py-2 rounded-md text-base font-medium focus:outline-none focus:text-white focus:bg-gray-700`}
            >
              {title}
            </ButtonOrLink>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          {user && (
            <div className="flex items-center px-5 space-x-3">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              </div>
              <div className="space-y-1">
                <div className="text-base font-medium leading-none text-white">
                  {user.displayName}
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  {user.email}
                </div>
              </div>
            </div>
          )}
          <div
            className="mt-3 px-2 space-y-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            {!user && (
              <ButtonOrLink
                onClick={signinWithGoogle}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Sign up/Log in
              </ButtonOrLink>
            )}
            {user &&
              profileLinks.map(({ title, href, onClick }) => (
                <ButtonOrLink
                  key={title}
                  href={href}
                  onClick={onClick}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                  role="menuitem"
                >
                  {title}
                </ButtonOrLink>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
