import React from 'react';
import Link from 'next/link';
import { OrbisLogo } from "./Icons";

function Footer() {
  return (
    <footer className="border-t border-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-8">
          {/* Top area */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-4">
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <Link className="inline-flex group mb-8 md:mb-0 text-primary" href="/">
                <img src="/white-logo.png" className="h-8" />
              </Link>
            </div>
            {/* Right links */}
            <div className="text-sm font-medium md:order-1 mb-2 md:mb-0">
              <ul className="inline-flex flex-wrap text-sm space-x-6">
                {/**<li>
                  <Link className="text-white hover:underline" href="/post/kjzl6cwe1jw14b9pin02aak0ot08wvnrhzf8buujkop28swyxnvtsjdye742jo6">
                    Learn more
                  </Link>
                </li>*/}
                <li>
                  <Link className="text-secondary hover:underline flex flex-row items-center" href="https://useorbis.com/" target="_blank">
                    Built with <OrbisLogo className="ml-1 mr-1" /> Orbis
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
