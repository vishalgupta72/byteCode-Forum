import React, { useState } from "react";

const CommunityPage = () => {
  const data = Array.from(Array(10).keys())

  return (
    <div className="">
      <div className="flex flex-wrap gap-3">

        {data.map(c => <div key={c} data-card class="xl:w-[calc(33%-1rem)] lg:w-[calc(50%-1rem)] rounded-lg border border-gray-200 shadow-2xl hover:shadow-lg transition-shadow duration-300 mt-4">
          <div class="p-4">
            <h2 class="text-lg font-bold text-gray-100 p-1 w-fit max-w-full">
              Reactjs {c}
            </h2>
            <p class="text-sm text-gray-200 mt-2">
              Join our vibrant community to share knowledge, ask questions, and
              collaborate on amazing projects.
            </p>
            <div class="mt-4 flex justify-between items-center">
              
              <span class="text-gray-400 text-sm">10 questions</span>
              <span class="text-gray-400 text-sm">120 Members</span>
            </div>
          </div>
        </div>)}

      </div>
    </div>
  );
};

export default CommunityPage;
