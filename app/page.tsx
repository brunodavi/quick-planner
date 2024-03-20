"use client"

import { useEffect, useState } from 'react';

import Export from './components/Export';
import Help from "./components/Help";
import EditorWithInitialState from './components/EditorWithState';
import Skeleton from './components/Skeleton';

export default function Home() {
  const [jsonTree, setJsonTree] = useState<JsonTree>([])
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => { setLoaded(true) }, [])

  return (
    <main>
      <header className="h-[10vh] flex justify-between items-center p-3">
        <h1 className="font-bold text-xl text-white">Quick Planner</h1>

        <div className="flex justify-between border-white h-8 w-24 lg:w-60">
          <Help />
          <Export jsonTree={jsonTree} />
        </div>
      </header>
      <div className="bg-[#0D1117]">
        {
          (loaded)
            ? <EditorWithInitialState setJsonTree={setJsonTree} />
            : <Skeleton />
        }
      </div>
    </main>
  );
}
