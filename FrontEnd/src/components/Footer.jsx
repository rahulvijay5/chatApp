import React from 'react'

function Footer() {
  return (
    <div className="flex text-white gap-2 text-sm py-4 px-8 bg-slate-900 sm:flex-row flex-col">
      <p>
        Built by <button className="underline">Sagar Malik</button>
      </p>
      <button>
        <div className="flex gap-1">
          <p>&#8226;</p>
          <a href="https://github.com/Sagar1205" className="underline">
            GitHub
          </a>
        </div>
      </button>
      <button>
        <div className="flex gap-1">
          <p>&#8226;</p>
          <a
            href="https://www.linkedin.com/in/sagarmalik1205/"
            className="underline"
          >
            LinkedIn
          </a>
        </div>
      </button>
    </div>
  );
}

export default Footer