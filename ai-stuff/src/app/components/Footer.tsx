import React from "react";

const Footer: React.FC = () => {
  return (
    <section className="text-center py-20 bg-blue-50">
      <h2 className="text-3xl font-bold">Made by Davide Zambiasi</h2>
      <p className="text-lg mt-4">Let's connect!</p>
      <div className="mt-8 inline-flex justify-center space-x-4">
        <a
          href="https://twitter.com/web3Dav3"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Twitter Button */}
          <button className="flex items-center px-6 py-2 bg-blue-400 text-white rounded">
            {/* Twitter SVG Icon */}
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.49-1.75.85-2.72 1.05-.78-.83-1.89-1.35-3.13-1.35-2.37 0-4.29 1.93-4.29 4.29 0 .34.04 .67.11 .98-3.56-.18-6.72-1.89-8.84-4.49-.37.64-.58 1.37-.58 2.15 0 1.49.76 2.8 1.91 3.57-.71-.02-1.37-.22-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.28 0-.55-.03-.81-.07.55 1.72 2.15 2.81 4.04 2.84-1.48 1.16-3.34 1.85-5.36 1.85-.35 0-.69-.02-1.03-.06 1.91 1.23 4.17 1.95 6.6 1.95 7.93 0 12.28-6.58 12.28-12.29 0-.19 0-.37-.01-.56.84-.61 1.57-1.37 2.15-2.24z"></path>
            </svg>
            web3Dav3
          </button>
        </a>
        <a
          href="https://www.linkedin.com/in/davide-zambiasi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center px-6 py-2 bg-blue-600 text-white rounded">
            {/* LinkedIn SVG Icon */}
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.23 0H1.77C.79 0 0 .79 0 1.77v20.46C0 23.21.79 24 1.77 24h20.46c.98 0 1.77-.79 1.77-1.77V1.77C24 .79 23.21 0 22.23 0zM8.29 20.49H4.66V9.02h3.63zm-1.82-13.2c-1.13 0-1.82-.74-1.82-1.67s.69-1.67 1.82-1.67c1.13 0 1.82.74 1.82 1.67s-.69 1.67-1.82 1.67zm13.25 13.2h-3.63v-5.59c0-1.33-.48-2.24-1.67-2.24-1.67 0-2.02 1.27-2.02 2.05v5.78h-3.63V9.02h3.41v1.56h.05c.47-.9 1.64-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.31z"></path>
            </svg>
            LinkedIn
          </button>
        </a>
        {/* Portfolio Button */}
        <a
          href="https://davideai.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center px-6 py-2 bg-purple-500 text-white rounded">
            {/* Portfolio SVG Icon (Example: Briefcase) */}
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM9 5c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H9V5zm11 14H4c-.55 0-1-.45-1-1V10h18v8c0 .55-.45 1-1 1z"></path>
            </svg>
            Portfolio
          </button>
        </a>
      </div>
    </section>
  );
};

export default Footer;
