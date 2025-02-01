import React from "react";
import "./Sidebar.css";
import { CheckIcon, CodeIcon, FollowingUserIcon, PopularOfDayIcon } from "./Icons";

const Sidebar = () => {
  return (
    <div className="sidebar overflow-auto max-h-full mt-7 pb-24 p-2">
      {/* quick links */}
      <div className="quick-links flex flex-col">
        <div className="quick-links-section flex items-center gap-2">
          <CheckIcon />
          <div className="flex flex-col">
            <h5>Newest and Recent</h5>
            <p>Find the latest update</p>
          </div>
        </div>

        <div className="quick-links-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h3>Popular of the day</h3>
          <p>Shots featured today</p>
          </div>
        </div>
        <div className="quick-links-section flex items-center gap-2">
          <FollowingUserIcon />
          <div className="flex flex-col">
          <h3>Following</h3>
          <p>Explore from your fav person</p>
          </div>
        </div>
      </div>

      {/* popular tags */}
      <div className="popular-tags flex flex-col">
        <h2 className="text-2xl font-sans m-3">Popular Tags</h2>

        <div className="popular-tags-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h5>#javascript</h5>
          <p>82,465 Posted by this tag</p>
          </div>
        </div>

        <div className="popular-tags-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h3>#bitcoin</h3>
          <p>65,523 Posted - Trending</p>
          </div>
        </div>

        <div className="popular-tags-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h3>#design</h3>
          <p>51,354 - Trending in Bangladesh</p>
          </div>
        </div>

        <div className="popular-tags-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h3>#blogging</h3>
          <p>48,025 Posted by this tag</p>
          </div>
        </div>

        <div className="popular-tags-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h3>#innovation</h3>
          <p>48,025 Posted by this tag</p>
          </div>
        </div>

        <div className="popular-tags-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h3>#tutorial</h3>
          <p>51,354 - Trending in Bangladesh</p>
          </div>
        </div>


      </div>

      {/* pinned-group */}
      <div className="pinned-group flex flex-col">
        <h2 className="text-2xl font-sans m-3">Pinned Group →</h2>

        <div className="pinned-group-section flex items-center gap-2">
          <CodeIcon />
          <div className="flex flex-col">
          <h5>#javascript</h5>
          <p>82,465 Posted by this tag</p>
          </div>
        </div>

        <div className="pinned-group-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h3>#bitcoin</h3>
          <p>65,523 Posted - Trending</p>
          </div>
        </div>

        <div className="pinned-group-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h3>#design</h3>
          <p>51,354 - Trending in Bangladesh</p>
          </div>
        </div>

        <div className="pinned-group-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h3>#blogging</h3>
          <p>48,025 Posted by this tag</p>
          </div>
        </div>

        <div className="pinned-group-section flex items-center gap-2">
          <PopularOfDayIcon />
          <div className="flex flex-col">
          <h3>#innovation</h3>
          <p>48,025 Posted by this tag</p>
          </div>
        </div>


      </div>

    </div>
  );
};

export default Sidebar;
